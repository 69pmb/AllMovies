import { Movie } from './../../../model/movie';
import { Url } from './../../../constant/url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MovieSearchService {

  constructor(private http: HttpClient) { }

  search(term: string, adult: boolean, language: string): Observable<Movie[]> {
    let url = Url.MOVIE_SEARCH_URL + Url.API_KEY;
    if (adult) { url += Url.ADULT_URL; }
    url += `${Url.QUERY_URL}${term}${Url.LANGUE}${language}`;
    return this.http
      .get(url, { headers: this.getHeaders() })
      .map(this.mapMovies)
      .map(data => data.slice(0, 5));
  }

  getHeaders() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return headers;
  }

  mapMovies(response: any): Movie[] {
    // The response of the API has a results
    // property with the actual results
    // console.log(response.results);
    return response.results.map((r: any) => <Movie>({
      id: r.id,
      title: r.title,
      date: r.release_date,
      adult: r.adult,
      original_title: r.original_title === r.title ? '' : r.original_title,
      thumbnail: r.poster_path === null ? null : Url.IMAGE_URL_ORIGINAL + r.poster_path
    }));
  }

}
