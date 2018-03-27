import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectComponent } from './connect/connect.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ForgotComponent } from './forgot/forgot.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthGard } from '../../app.gards';
import { ProfileComponent } from './profile/profile.component';

const childRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'connect', pathMatch: 'full' },
      { path: 'connect', component: ConnectComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGard] },
    ]
  }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    TranslateModule.forChild(),
    SharedModule,
    MatFormFieldModule,
    RouterModule.forChild(childRoutes),
  ],
  declarations: [
    ConnectComponent,
    RegisterComponent,
    ForgotComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  providers: [TranslateService]
})
export class LoginModule { }
