import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { FrontPageComponent } from './components/front-page/front-page.component';

const routes: Routes = [
  { path: 'frontpage', component: FrontPageComponent },
  { path: 'errorpage', component: ErrorpageComponent },
  { path: '', redirectTo: 'frontpage', pathMatch: 'full' },
  { path: '**', redirectTo: 'errorpage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
