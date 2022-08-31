// Angular
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ActorCardComponent } from './components/cards/actor-card/actor-card.component';
import { AreaCardComponent } from './components/cards/area-card/area-card.component';
import { PermissionCardComponent } from './components/cards/permission-card/permission-card.component';
import { SearchSectionComponent } from './components/search-results/search-section/search-section.component';
import { DocumentCardComponent } from './components/cards/document-card/document-card.component';

// Pages
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TopicsOfInterestComponent } from './pages/topics-of-interest/topics-of-interest.component';
import { UnderconstructionComponent } from './components/underconstruction/underconstruction.component';
import { StartComponent } from './pages/start/start.component';
import { SearchComponent } from './pages/search/search.component';
import { AdminStartComponent } from './pages/admin-start/admin-start.component';
import { AreaPageComponent } from './pages/area-page/area-page.component';
import { ActorPageComponent } from './pages/actor-page/actor-page.component';
import { SearchResultPageComponent } from './pages/search-result-page/search-result-page.component';

//HttpInteceptors
import { AuthIntercept } from './auth-intercept';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

// Utilites
import { CutTextPipe } from './utils/cut-text.pipe';
import { DocumentPageComponent } from './pages/document-page/document-page.component';
import { PermissionPageComponent } from './pages/permission-page/permission-page.component';
import { AddHttpPipe } from './utils/add-http.pipe';
import { RelationSideBarComponent } from './components/relation-side-bar/relation-side-bar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AdminErrorOverviewPageComponent } from './pages/admin-error-overview-page/admin-error-overview-page.component';
import { FaultyObjectsTableComponent } from './components/faulty-objects-table/faulty-objects-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    ErrorpageComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    DashboardComponent,
    TopicsOfInterestComponent,
    SearchComponent,
    SearchbarComponent,
    UnderconstructionComponent,
    StartComponent,
    ActorCardComponent,
    AreaCardComponent,
    PermissionCardComponent,
    AdminStartComponent,
    AreaPageComponent,
    ActorPageComponent,
    CutTextPipe,
    SearchResultPageComponent,
    SearchSectionComponent,
    DocumentCardComponent,
    DocumentPageComponent,
    PermissionPageComponent,
    AddHttpPipe,
    RelationSideBarComponent,
    LoadingSpinnerComponent,
    AdminErrorOverviewPageComponent,
    FaultyObjectsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthIntercept, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
