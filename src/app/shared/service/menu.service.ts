import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  visible$ = new BehaviorSubject<boolean>(true);
  scrollTo$ = new BehaviorSubject<number>(0);

  constructor() { }

}
