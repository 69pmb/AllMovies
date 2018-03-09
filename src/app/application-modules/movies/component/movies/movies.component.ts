import { Utils } from './../../../../shared/utils';
import { DropboxService } from './../../../../service/dropbox.service';
import { Movie } from './../../../../model/movie';
import { MovieService } from './../../../../service/movie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';

const init_columns = ['id', 'thumbnail', 'title', 'original_title', 'date', 'note', 'language', 'genres', 'time'];

@Component({
  selector: 'app-my-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  displayedColumns = init_columns;
  movies: Movie[];
  length: number;
  displayedData: Movie[];
  filter: string;
  pageSize = 25;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];
  page: PageEvent;
  sort: Sort;
  genres: string[];
  constructor(private movieService: MovieService, private router: Router, private breakpointObserver: BreakpointObserver,
    private dropboxService: DropboxService) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      '(max-width: 700px)'
    ]).subscribe(result => {
      this.displayedColumns = result.matches ? ['thumbnail', 'title', 'date', 'note', 'language', 'time', 'genres'] : init_columns;
    });
    this.getMovies();
  }

  getMovies(): void {
    this.dropboxService.getAllMovies('ex.json').then(movies => {
      this.movies = movies;
      this.length = this.movies.length;
      this.checkAndFixData();
      this.initPagination(this.movies);
      this.getAllGenres();
    });
  }

  getAllGenres() {
    let all = [];
    this.movies.forEach((movie: Movie) => {
      all.push(...movie.genres);
    });
    this.genres = [];
    all.forEach((genre: string) => {
      if (!this.genres.includes(genre)) {
        this.genres.push(genre);
      }
    });
  }

  refreshData(): Movie[] {
    const list = this.sortData(Utils.filter(this.movies, this.filter));
    this.length = list.length;
    return list;
  }

  onSearch() {
    this.initPagination(this.refreshData());
  }

  onSort() {
    this.initPagination(this.refreshData());
  }

  onPaginateChange() {
    this.paginate(this.refreshData());
  }

  paginate(data: Movie[]) {
    this.displayedData = this.page ?
      data.slice(this.page.pageIndex * this.page.pageSize, (this.page.pageIndex + 1) * this.page.pageSize) : data.slice(0, this.pageSize);
  }

  initPagination(list: Movie[]) {
    if (this.page) {
      this.page.pageIndex = 0;
      this.page.pageSize = this.page ? this.page.pageSize : this.pageSize;
    }
    this.paginate(list);
  }

  onFilterGenres(event: MatSelectChange) {
    let list = [];
    if (event.value.length > 0) {
      list = this.movies.filter((movie: Movie) => {
        return movie.genres.some(genre => {
          return event.value.includes(genre);
        });
      });
    } else {
      list = this.movies;
    }
    list = Utils.filter(list, this.filter);
    list = this.sortData(list);
    this.length = list.length;
    this.initPagination(list);
  }

  sortData(list: Movie[]): Movie[] {
    if (this.sort && this.sort.active && this.sort.direction !== '') {
      return list.sort((a, b) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
          case 'id':
            return this.compare(+a.id, +b.id, isAsc);
          case 'title':
            return this.compare(a.title, b.title, isAsc);
          case 'original_title':
            return this.compare(a.original_title, b.original_title, isAsc);
          case 'note':
            return this.compare(+a.note, +b.note, isAsc);
          case 'language':
            return this.compare(a.language, b.language, isAsc);
          case 'date':
            return this.compareDate(a.date, b.date, isAsc);
          case 'time':
            return this.compare(+a.time, +b.time, isAsc);
          default:
            return 0;
        }
      });
    } else {
      return list;
    }
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareDate(a, b, isAsc) {
    const year1 = a.split('/')[0];
    const month1 = a.split('/')[1];
    const year2 = b.split('/')[0];
    const month2 = b.split('/')[1];
    let result;
    if (year1 < year2) {
      result = -1;
    } else if (year1 > year2) {
      result = 1;
    } else {
      if (month1 < month2) {
        result = -1;
      } else if (month1 > month2) {
        result = 1;
      }
    }
    return result * (isAsc ? 1 : -1);
  }

  checkAndFixData(): void {
    let incomplete: number[] = [];
    for (const movie of this.movies) {
      if ((movie.time === undefined && movie.time == null)
        || (movie.genres === undefined && movie.genres == null)
        || (movie.original_title === undefined || movie.original_title == null || movie.original_title === '')) {
        incomplete.push(movie.id);
      }
    }
    incomplete = incomplete.slice(0, 20);
    const obs = incomplete.map((id: number) => {
      return this.movieService.getMovie(id, false, false, false, false, 'fr');
    });

    forkJoin(obs).subscribe(
      data => {
        console.log(data);
        this.dropboxService.replaceMovies(data, 'ex.json');
      },
      err => console.error(err)
    );
  }

  gotoDetail(id: number, event): void {
    const key = event.which;
    if (key === 1) {
      this.router.navigate(['movie', id]);
    } else if (key === 2) {
      window.open('/movie/' + id);
    }
  }
  remove() {
    // this.dropboxService.removeMovie(id, 'ex.json');
    // tableWidget.row(tr).remove();
    // tableWidget.draw();
  }

}
