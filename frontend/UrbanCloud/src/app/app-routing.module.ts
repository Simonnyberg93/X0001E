import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStartComponent } from './pages/admin-start/admin-start.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchComponent } from './pages/search/search.component';
import { StartComponent } from './pages/start/start.component';
import { TopicsOfInterestComponent } from './pages/topics-of-interest/topics-of-interest.component';
import { UnderconstructionComponent } from './components/underconstruction/underconstruction.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RoleGuard } from './guards/role.guard';
import { AreaPageComponent } from './pages/area-page/area-page.component';
import { ActorPageComponent } from './pages/actor-page/actor-page.component';
import { SearchResultPageComponent } from './pages/search-result-page/search-result-page.component';
import { DocumentPageComponent } from './pages/document-page/document-page.component';
import { PermissionPageComponent } from './pages/permission-page/permission-page.component';

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
        path: 'searchresults/:searchStr',
        component: SearchResultPageComponent,
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
      { path: 'area/:areaId', component: AreaPageComponent },
      { path: 'actor/:actorId', component: ActorPageComponent },
      { path: 'document/:documentId', component: DocumentPageComponent },
      { path: 'permission/:permissionId', component: PermissionPageComponent },
      {
        path: '',
        redirectTo: 'start', // perhaps change this to start when it is finished
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'adminstart',
    component: AdminStartComponent,
    canActivate: [AuthenticationGuard, RoleGuard],
  },
  { path: '', redirectTo: 'frontpage', pathMatch: 'full' },
  { path: '**', redirectTo: 'errorpage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
