import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { MovieDetailConfig } from './../../../../model/model';
import { TagMovie } from './../../../../model/tag';
import { MovieService } from './../../../../shared/service/movie.service';
import { Movie } from './../../../../model/movie';
import { MovieSearchService } from './../../../../shared/service/movie-search.service';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit {
  @Input() adult: boolean;
  @Output() selected = new EventEmitter<TagMovie>();
  filteredMovies: Observable<Movie[]>;
  movieCtrl: FormControl;
  faRemove = faTimes;

  constructor(
    private movieSearchService: MovieSearchService,
    private movieService: MovieService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.movieCtrl = new FormControl();
    this.filteredMovies = this.movieCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => term
          ? this.movieSearchService.search(term, this.adult, this.translate.currentLang)
          : of<Movie[]>([])),
        catchError(error => {
          console.error(error);
          return of<Movie[]>([]);
        }));
  }

  add(item: Movie): void {
    const lang = this.translate.currentLang === 'fr' ? 'en' : 'fr';
    this.movieService.getMovie(item.id, new MovieDetailConfig(false, false, false, false, false, false, false, false, lang), false).then(movie => {
      const tag = new TagMovie();
      tag.id = item.id;
      tag.titles = new Map();
      tag.titles.set(this.translate.currentLang, item.title);
      tag.titles.set(lang, movie.title);
      this.selected.emit(tag);
    });
  }

}
