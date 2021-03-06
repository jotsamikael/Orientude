import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DeleteInterviewComponent } from './components/delete-interview/delete-interview.component';
import { EditInterviewComponent } from './components/edit-interview/edit-interview.component';
import { FooterComponent } from './components/footer/footer.component';
import { InterviewManagerComponent } from './components/interview-manager/interview-manager.component';
import { LoginComponent } from './components/login/login.component';
import { OffersComponent } from './components/offers/offers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { HomeComponent } from './home/home.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { SearchSchoolComponent } from './search-school/search-school.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'offers', component: OffersComponent},

  {path: 'search-school', component: SearchSchoolComponent},
  {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'footer', component: FooterComponent},

  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'interview', component: InterviewManagerComponent, canActivate: [AuthGuard]},
  {path: 'edit-interview/:id', component: EditInterviewComponent, canActivate: [AuthGuard]},
  {path: 'delete-interview/:id', component: DeleteInterviewComponent, canActivate: [AuthGuard]},
  {path: 'public-profile/:username', component: PublicProfileComponent, canActivate: [AuthGuard]},



  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]},



  //{path: '*', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
