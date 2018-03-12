import { ServiceUtils } from './../../../service/serviceUtils';
import { MapPerson } from './../../../shared/mapPerson';
import { Person } from './../../../model/person';
import { Url } from './../../../constant/url';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonSearchService {

  constructor(private serviceUtils: ServiceUtils) { }

  search(term: string, adult: boolean): Observable<Person[]> {
    let url = Url.PERSON_SEARCH_URL + Url.API_KEY;
    if (adult) {
      url += Url.ADULT_URL;
    }
    url += `${Url.QUERY_URL}${term}`;
    return this.serviceUtils
      .getObservable(url, this.serviceUtils.getHeaders())
      .map(response => MapPerson.mapForSearchPersons(response))
      .catch(this.serviceUtils.handleError);
  }
}
