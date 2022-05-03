import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
// Import the module from the SDK
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { SearchSchoolComponent } from './search-school/search-school.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component'
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { InterviewManagerComponent } from './components/interview-manager/interview-manager.component';
import { InterviewService } from './services/interview.service';
import { EditInterviewComponent } from './components/edit-interview/edit-interview.component';
import { FooterComponent } from './components/footer/footer.component';
import { DeleteInterviewComponent } from './components/delete-interview/delete-interview.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OffersComponent } from './components/offers/offers.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';




@NgModule({
  declarations: [
    AppComponent,
    BackButtonComponent,
    HomeComponent,
    SearchSchoolComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    InterviewManagerComponent,
    EditInterviewComponent,
    FooterComponent,
    DeleteInterviewComponent,
    PublicProfileComponent,
    OffersComponent,
    AdminPanelComponent,
  
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    AngularEditorModule,
    FilterPipeModule


    
    
  ],
  providers: [ { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
     AuthGuard,
    NotAuthGuard,
  InterviewService,
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
