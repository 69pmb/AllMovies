import { TranslateService } from '@ngx-translate/core';
import { faBookmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';
import {
  Directive, Input, HostListener, ViewContainerRef, ComponentFactoryResolver,
  Renderer2, ElementRef, OnChanges, SimpleChange, ComponentRef
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { Movie } from '../../model/movie';
import { MovieService } from '../service/movie.service';
import { MyMoviesService } from './../service/my-movies.service';
import { AuthService } from '../service/auth.service';
import { MovieDetailConfig } from '../../model/model';

@Directive({
  selector: '[appAddCollection]'
})
export class AddCollectionDirective implements OnChanges {
  faBookmark = faBookmark;
  faStar = faStar;
  @Input()
  movies: Movie[];
  @Input()
  label: string;
  @HostListener('click', ['$event']) onClick(): void {
    this.add();
  }

  constructor(
    private movieService: MovieService,
    private myMoviesService: MyMoviesService,
    private translate: TranslateService,
    private auth: AuthService,
    private vcRef: ViewContainerRef,
    private el: ElementRef,
    private cfr: ComponentFactoryResolver,
    private render: Renderer2
  ) {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    for (const field of Object.keys(changes)) {
      if (field === 'movies') {
        this.movies = changes[field].currentValue;
        this.initBtnIcon();
      }
    }
  }

  initBtnIcon(): void {
    const cmpFactory = this.cfr.resolveComponentFactory(FaIconComponent);
    const component = this.vcRef.createComponent(cmpFactory);
    this.myMoviesService.myMovies$.subscribe(myMovies => {
      if (myMovies && myMovies.length > 0) {
        this.insertIconAndText(this.movies.filter(movie => !myMovies.map(m => m.id).includes(movie.id)).length === 0, component);
      }
    });
  }

  insertIconAndText(isAlreadyAdded: boolean, component: ComponentRef<FaIconComponent>): void {
    if (isAlreadyAdded) {
      component.instance.iconProp = faStar;
      this.el.nativeElement.innerText = this.translate.instant('global.already_added');
      this.el.nativeElement.style.pointerEvents = 'none';
    } else {
      component.instance.iconProp = faBookmark;
      this.el.nativeElement.innerText = this.translate.instant(this.label);
      this.el.nativeElement.style.pointerEvents = 'all';
    }
    this.render.insertBefore(
      this.vcRef.element.nativeElement,
      component.location.nativeElement,
      this.el.nativeElement.firstChild
    );
    component.instance.ngOnChanges({});
  }

  add(): void {
    if (this.movies.length > 1) {
      this.movies = this.movies.filter((mov: Movie) => mov.checked);
    }
    this.addMovies();
  }

  addMovies(): void {
    const prom = [];
    this.movies.forEach(movie => {
      prom.push(this.movieService.getMovie(movie.id, new MovieDetailConfig(false, false, false, false, false, false, false, false, 'fr'), false));
      prom.push(this.movieService.getMovie(movie.id, new MovieDetailConfig(false, false, false, false, false, false, false, false, 'en'), false));
      movie.added = new Date();
    });
    forkJoin(prom).subscribe((movies: Movie[]) => {
      this.auth.getFileName().then((fileName) => {
        this.myMoviesService.add(movies, fileName);
        this.movies.forEach((movie) => movie.checked = false);
      });
    });
  }
}
