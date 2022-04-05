import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditInterviewComponent } from './components/edit-interview/edit-interview.component';
import { FooterComponent } from './components/footer/footer.component';
import { InterviewManagerComponent } from './components/interview-manager/interview-manager.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { HomeComponent } from './home/home.component';
import { SearchSchoolComponent } from './search-school/search-school.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'search-school', component: SearchSchoolComponent},
  {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'fooeter', component: FooterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'interview', component: InterviewManagerComponent, canActivate: [AuthGuard]},
  {path: 'edit-interview/:id', component: EditInterviewComponent, canActivate: [AuthGuard]},


  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},



  //{path: '*', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
