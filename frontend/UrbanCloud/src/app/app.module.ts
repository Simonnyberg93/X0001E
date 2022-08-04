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
import { DataCardComponent } from './components/cards/data-card/data-card.component';
import { CardLayoutComponent } from './components/card-layout/card-layout.component';
import { ActorCardComponent } from './components/cards/actor-card/actor-card.component';
import { TopSearchResultsComponent } from './components/search-results/top-search-results/top-search-results.component';
import { AreasSearchResultComponent } from './components/search-results/areas-search-result/areas-search-result.component';
import { ActorsSearchResultComponent } from './components/search-results/actors-search-result/actors-search-result.component';
import { PermsissionsSearchResultComponent } from './components/search-results/permsissions-search-result/permsissions-search-result.component';
import { AreaCardComponent } from './components/cards/area-card/area-card.component';
import { PermissionCardComponent } from './components/cards/permission-card/permission-card.component';
import { SmallActorCardComponent } from './components/cards/small-actor-card/small-actor-card.component';
import { SmallAreaCardComponent } from './components/cards/small-area-card/small-area-card.component';

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
import { SearchResultPageComponent } from './pages/search-result-page/search-result-page.component';

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
    DataCardComponent,
    CardLayoutComponent,
    ActorCardComponent,
    TopSearchResultsComponent,
    ActorsSearchResultComponent,
    AreasSearchResultComponent,
    PermsissionsSearchResultComponent,
    AreaCardComponent,
    PermissionCardComponent,
    AdminStartComponent,
    AreaPageComponent,
    ActorPageComponent,
    SmallActorCardComponent,
    SmallAreaCardComponent,
    CutTextPipe,
    SearchResultPageComponent,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthIntercept, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
