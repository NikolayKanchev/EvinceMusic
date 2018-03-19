import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GlobalpartnershipComponent } from './globalpartnership/globalpartnership.component';
import { LoginComponent } from './login/login.component';
import { PromoteComponent } from './promote/promote.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PrivatelessonsComponent } from './privatelessons/privatelessons.component';
import { ProfessionalServicesComponent } from './professional-services/professional-services.component';
import { TalentComponent } from './talent/talent.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'privatelessons', component: PrivatelessonsComponent},
  { path: 'globalpartnership', component: GlobalpartnershipComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'login/register', component: RegisterComponent},
  { path: 'login/resetpassword', component: ResetpasswordComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'promote', component: PromoteComponent},
  { path: 'promote/register', component: RegisterComponent },
  { path: 'professionalservices', component: ProfessionalServicesComponent},
  { path: 'talent', component: TalentComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
