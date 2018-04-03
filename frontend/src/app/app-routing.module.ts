import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PromoteComponent } from './promote/promote.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfessionalServicesComponent } from './professional-services/professional-services.component';
import { TalentComponent } from './talent/talent.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AccSettingsComponent } from './acc-settings/acc-settings.component';
import { UserExistComponent } from './user-exist/user-exist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'login/register', component: RegisterComponent},
  { path: 'login/resetpassword', component: ResetpasswordComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'professionalservices', component: ProfessionalServicesComponent},
  { path: 'promote', component: PromoteComponent},
  { path: 'talent', component: TalentComponent},
  { path: 'adminpage', component: AdminpageComponent},
  { path: 'user-exist', component: UserExistComponent},
  { path: 'acc-settings', component: AccSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
