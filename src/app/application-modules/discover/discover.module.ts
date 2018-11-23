import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NouisliderModule } from 'ng2-nouislider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatListModule, MatIconModule, MatButtonToggleModule, MatSelectModule,
  MatFormFieldModule, MatPaginatorModule, MatPaginatorIntl, MatInputModule, MatAutocompleteModule, MatChipsModule, MatSlideToggleModule
} from '@angular/material';

import { SearchBoxComponent } from './component/search-box/search-box.component';
import { MyPaginator } from './../movies/component/my-paginator';
import { DiscoverComponent } from './component/discover.component';
import { SharedModule } from './../../shared/shared.module';

const childRoutes: Routes = [
  {
    path: '', component: DiscoverComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(childRoutes),
    SharedModule.forChild(),
    TranslateModule.forChild(),
    MatListModule,
    FontAwesomeModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    NouisliderModule,
    MatFormFieldModule,
    MatChipsModule,
    MatButtonToggleModule
  ],
  providers: [
    TranslateService,
    { provide: MatPaginatorIntl, useClass: MyPaginator, deps: [TranslateService] }],
  declarations: [DiscoverComponent, SearchBoxComponent]
})
export class DiscoverModule { }
