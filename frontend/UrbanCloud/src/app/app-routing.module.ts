import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { StartComponent } from './components/start/start.component';
import { TopicsOfInterestComponent } from './components/topics-of-interest/topics-of-interest.component';
import { UnderconstructionComponent } from './components/underconstruction/underconstruction.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: 'frontpage', component: FrontPageComponent },
  { path: 'errorpage', component: ErrorpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'topics',
    component: TopicsOfInterestComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'profile',
        component: UnderconstructionComponent,
      },
      {
        path: 'start',
        component: StartComponent,
      },
      {
        path: 'maptool',
        component: UnderconstructionComponent,
      },
      {
        path: 'myprojekt',
        component: UnderconstructionComponent,
      },
      {
        path: 'addprojekt',
        component: UnderconstructionComponent,
      },
      {
        path: 'about',
        component: UnderconstructionComponent,
      },
      {
        path: '',
        redirectTo: 'start', // perhaps change this to start when it is finished
        pathMatch: 'full',
      },
    ],
  },
  { path: '', redirectTo: 'frontpage', pathMatch: 'full' },
  { path: '**', redirectTo: 'errorpage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
