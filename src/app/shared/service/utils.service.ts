import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';

@Injectable()
export class UtilsService {

  constructor(private http: HttpClient) {
  }

  static getErrorMessage(error: any): string {
    let message;
    if (error.response) {
      message = error.response.error;
    } else if (error.error && error.error.errors) {
      message = 'Status ' + error.status + ': ' + error.error.errors.join(', ');
    } else if (error.error) {
      message = error.error;
    } else if (error.message) {
      message = error.message;
    } else {
      message = error;
    }
    return message;
  }

  static encodeQueryUrl(query: string): string {
    return encodeURIComponent(query).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // headers.append('Accept', 'application/json');
    return headers;
  }

  handleSuccess(messageKey: string): void {

  }

  handleError(error: any, toast: ToastService): void {
    console.log('handleError');
    console.error('error', error);
    toast.open(UtilsService.getErrorMessage(error));
  }

  handlePromiseError(error: any, toast: ToastService): Promise<any> {
    console.log('handlePromiseError');
    console.error('error', error);
    toast.open(UtilsService.getErrorMessage(error));
    return new Promise<any>((resolve, reject) => {
      resolve();
    });
  }

  getPromise<T>(url: string, headers?: HttpHeaders): Promise<T> {
    return this.getObservable<T>(url, headers).toPromise();
  }

  getObservable<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return headers ? this.http.get<T>(url, { headers: headers }) : this.http.get<T>(url);
  }

  jsonpPromise<T>(url: string, callback: any): Promise<T> {
    return this.jsonpObservable<T>(url, callback).toPromise();
  }

  jsonpObservable<T>(url: string, callback: any): Observable<T> {
    return this.http.jsonp<T>(url, callback);
  }

}
