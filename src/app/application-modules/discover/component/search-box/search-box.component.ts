import { SearchServiceService } from './../../../../service/searchService.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent<T> implements OnInit {
  @Input('adult') adult: boolean;
  @Input('service') service: SearchServiceService;
  @Input('placeholder') placeholder: string;
  @Output('items') items = new EventEmitter<T[]>();
  itemCtrl: FormControl;
  filteredItems: Observable<T[]>;
  list: T[] = [];

  constructor() { }

  ngOnInit() {
    this.itemCtrl = new FormControl();
    this.filteredItems = this.itemCtrl.valueChanges
      .debounceTime(300).distinctUntilChanged().switchMap(term => term
        ? this.service.search(term, this.adult)
        : Observable.of<T[]>([]))
      .catch(error => {
        console.error(error);
        return Observable.of<T[]>([]);
      });
  }

  addItem(item: T) {
    this.list.push(item);
    this.items.emit(this.list);
  }

  removeItem(item: T): void {
    const index = this.list.indexOf(item);

    if (index >= 0) {
      this.list.splice(index, 1);
    }
  }

}
