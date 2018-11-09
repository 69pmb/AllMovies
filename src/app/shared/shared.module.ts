import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  SwiperModule,
  SWIPER_CONFIG
} from 'ngx-swiper-wrapper';
import { PinchZoomModule } from 'ngx-pinch-zoom';

import { MetaComponent } from './components/meta/component/meta.component';
import { GoToTopComponent } from './components/go-to-top/go-to-top.component';
import './rxjs-operators';
import { ListPersonsComponent } from './components/list-persons/list-persons.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { UtilsService } from './service/utils.service';
import { AddCollectionDirective } from './directives/add-collection.directive';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { DropdownLanguageComponent } from './components/dropdown-language/dropdown-language.component';
import { MetaService } from './components/meta/service/meta.service';
import { OmdbService } from './service/omdb.service';
import { FilterCrewPipe } from './pipes/filterCrew.pipe';
import { CapitalizeWordPipe } from './pipes/capitalizeWord.pipe';
import { HeaderComponent } from './components/header/header.component';
import { SubstractDatePipe } from './pipes/substractDate.pipe';
import { ConvertToHHmmPipe } from './pipes/convertToHHmm.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { MovieService } from './service/movie.service';
import { DropboxService } from './service/dropbox.service';
import { AuthService } from './service/auth.service';
import { TitleService } from './service/title.service';
import { PersonService } from './service/person.service';
import { GenreService } from './service/genre.service';
import { PersonSearchService } from './service/person-search.service';
import { MovieSearchService } from './service/movie-search.service';
import { CertificationService } from './service/certification.service';
import { KeywordSearchService } from './service/keyword-search.service';
import { ToastService } from './service/toast.service';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { PersonSearchComponent } from './components/person-search/person-search.component';

@NgModule({
  declarations: [
    ConvertToHHmmPipe,
    SubstractDatePipe,
    CapitalizeWordPipe,
    FilterCrewPipe,
    ListMoviesComponent,
    MetaComponent,
    ListPersonsComponent,
    DropdownLanguageComponent,
    GoToTopComponent,
    AddCollectionDirective,
    ModalComponent,
    MovieSearchComponent,
    PersonSearchComponent,
    HeaderComponent,
    ImageViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    FontAwesomeModule,
    SwiperModule,
    PinchZoomModule,
    NgbModule,
    TranslateModule.forChild(),
    MatTooltipModule,
    RouterModule.forChild([])
  ],
  exports: [
    ConvertToHHmmPipe,
    SubstractDatePipe,
    CapitalizeWordPipe,
    FilterCrewPipe,
    GoToTopComponent,
    ListMoviesComponent,
    MetaComponent,
    ListPersonsComponent,
    DropdownLanguageComponent,
    AddCollectionDirective,
    NgbModule,
    MatTooltipModule,
    MatStepperModule,
    ModalComponent,
    MovieSearchComponent,
    PersonSearchComponent,
    ImageViewerComponent,
    HeaderComponent,
  ]
})

export class SharedModule {
  constructor() { }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MetaService,
        UtilsService,
        TranslateService,
        MovieService,
        OmdbService,
        DropboxService,
        AuthService,
        TitleService,
        PersonService,
        GenreService,
        PersonSearchService,
        MovieSearchService,
        CertificationService,
        KeywordSearchService,
        ToastService,
        {
          provide: SWIPER_CONFIG,
          useValue: {}
        }
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return { ngModule: SharedModule };
  }
}

export { UtilsService } from './service/utils.service';
export { MovieService } from './service/movie.service';
export { DropboxService } from './service/dropbox.service';
export { AuthService } from './service/auth.service';
export { TitleService } from './service/title.service';
export { PersonService } from './service/person.service';
export { GenreService } from './service/genre.service';
export { PersonSearchService } from './service/person-search.service';
export { MovieSearchService } from './service/movie-search.service';
export { CertificationService } from './service/certification.service';
export { KeywordSearchService } from './service/keyword-search.service';
export { ToastService } from './service/toast.service';
