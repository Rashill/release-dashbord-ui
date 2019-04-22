import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthComponent } from './components/auth/auth.component';

import { MainComponent } from './components/shared/main/main.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { HomeComponent } from './components/home/home.component';
import { NgTimelineComponent } from './components/ng-timeline/ng-timeline.component';

import { AuthGuard } from '../guards/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    
    children: [
      {
        path: 'ngtimeline',
         component: NgTimelineComponent,
         canActivate : [AuthGuard],
      },
      {
        path: '',
        component: HomeComponent,
      }
      
    ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'auth', component: AuthComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'reset-password', component: ResetPasswordComponent },
  
  {
    path: '404',
    component: NotFoundPageComponent,
    data: { message: 'Page not found!' }
  },
  { path: '**', redirectTo: '/404', pathMatch: 'prefix' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
