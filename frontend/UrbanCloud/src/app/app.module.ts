// Angular
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopicsOfInterestComponent } from './components/topics-of-interest/topics-of-interest.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';

import { SearchComponent } from './components/search/search.component';

//Guards
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
import { UnderconstructionComponent } from './components/underconstruction/underconstruction.component';
import { StartComponent } from './components/start/start.component';
import { DataCardComponent } from './components/data-card/data-card.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
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
