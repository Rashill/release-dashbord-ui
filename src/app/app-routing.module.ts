import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { CreateReleaseComponent } from './components/release/create/create.component';

import { MainComponent } from './components/shared/main/main.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ForbiddenPageComponent } from './components/forbidden-page/forbidden-page.component';
import { HomeComponent } from './components/home/home.component';
import { ViewReleaseComponent } from './components/release/release.component';
import { TeamComponent } from './components/team/team.component';
import { UsersComponent } from './components/users/users.component';
import { ChecklistComponent } from './components/checklist/checklist.component';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'team',
        component: TeamComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'user',
        component: UsersComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'checklist',
        component: ChecklistComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'release/create',
        component: CreateReleaseComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'release/edit/:id',
        component: CreateReleaseComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'release/:id',
        component: ViewReleaseComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'upload',
        component: FileUploaderComponent,
        canActivate: [AdminGuard]
      }
    ]
  },
  { path: 'auth', component: AuthComponent },

  // { path: 'signup', component: SignupComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'reset-password', component: ResetPasswordComponent },

  {
    path: '404',
    component: NotFoundPageComponent,
    data: { message: 'Page not found!' }
  },
  {
    path: '403',
    component: ForbiddenPageComponent,
    data: { message: 'Unauthorised!' }
  },
  { path: '**', redirectTo: '/404', pathMatch: 'prefix' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
