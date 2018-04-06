import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PromoteComponent } from './promote/promote.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfessionalServicesComponent } from './professional-services/professional-services.component';
import { TalentComponent } from './talent/talent.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard, UserAccessGuard, AdminAccess} from './auth.guard';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AccSettingsComponent } from './acc-settings/acc-settings.component';
import { ErrorComponent } from './error/error.component';
import { ResetpasswordComponent } from './login/resetpassword/resetpassword.component';
import { UsersComponent } from './adminpage/users/users.component';
import { ManageHomePageComponent } from './adminpage/manage-home-page/manage-home-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent,
  data: { onlyGuests: true },
      canActivate: [ UserAccessGuard ],
   children: [
    { path: 'resetpassword', component: ResetpasswordComponent},
  ]},
  { path: 'login/register', component: RegisterComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'professionalservices', component: ProfessionalServicesComponent},
  { path: 'promote', component: PromoteComponent},
  { path: 'talent', component: TalentComponent},
  { path: 'adminpage', component: AdminpageComponent, canActivate: [AdminAccess]},{ path: 'adminpage', component: AdminpageComponent, canActivate: [AdminAccess], children:[
    { path: 'users', component: UsersComponent},
    { path: 'manage-home-page', component: ManageHomePageComponent}
  ]},
  { path: 'error', component: ErrorComponent},
  { path: 'acc-settings', component: AccSettingsComponent},
  { path: 'error/login', redirectTo: 'login', pathMatch: 'full'},
  { path: 'error/home', redirectTo: 'home', pathMatch: 'full'},
  { path: 'error/register', redirectTo: 'login/register', pathMatch: 'full'},
  { path: 'error/resetpassword', redirectTo: 'login/resetpassword', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
