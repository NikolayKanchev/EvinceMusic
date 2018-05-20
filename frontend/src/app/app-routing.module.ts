import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PromoteComponent } from './components/promote/promote.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ProfessionalServicesComponent } from './components/professional-services/professional-services.component';
import { TalentComponent } from './components/talent/talent.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard} from './guards/auth.guard';
import { UserAccessGuard } from './guards/auth.userAccessGuard';
import { AdminAccess } from './guards/auth.adminGuard';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { AccSettingsComponent } from './components/acc-settings/acc-settings.component';
import { ErrorComponent } from './components/error/error.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { UsersComponent } from './components/adminpage/users/users.component';
import { ManageHomePageComponent } from './components/adminpage/manage-home-page/manage-home-page.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { AllProjectsComponent } from './components/adminpage/manage-home-page/all-projects/all-projects.component';
import { AddNewProjectComponent } from './components/adminpage/manage-home-page/add-new-project/add-new-project.component';
import { ProjectComponent } from './components/project/project.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent,
  data: { onlyGuests: true },
      canActivate: [ UserAccessGuard ]
  },
  { path: 'resetpassword', component: ResetpasswordComponent},
  { path: 'login/resetpassword', redirectTo:'resetpassword', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent},
  { path: 'login/register', redirectTo:'register', pathMatch: 'full'},
  { path: 'contacts', component: ContactsComponent},
  { path: 'professionalservices', component: ProfessionalServicesComponent},
  { path: 'promote', component: PromoteComponent},
  { path: 'talent', component: TalentComponent},
  { path: 'adminpage', component: AdminpageComponent, canActivate: [AdminAccess], children:[
    { path: 'users', component: UsersComponent},
    { path: 'manage-home-page', component: ManageHomePageComponent, children: [
      { path: 'all-projects', component: AllProjectsComponent},
      { path: 'add-new-project', component: AddNewProjectComponent},
    ]}
  ]},
  { path: 'project', component: ProjectComponent},
  // { path: 'adminpage', component: AdminpageComponent, children:[
  //   { path: 'users', component: UsersComponent},
  //   { path: 'manage-home-page', component: ManageHomePageComponent, children: [
  //     { path: 'all-projects', component: AllProjectsComponent},
  //     { path: 'add-new-project', component: AddNewProjectComponent},
  //   ]}
  // ]},
  { path: 'error', component: ErrorComponent},
  { path: 'acc-settings', component: AccSettingsComponent, canActivate: [AuthGuard]},
  { path: 'error/login', redirectTo: 'login', pathMatch: 'full'},
  { path: 'error/home', redirectTo: 'home', pathMatch: 'full'},
  { path: 'error/register', redirectTo: 'register', pathMatch: 'full'},
  { path: 'error/resetpassword', redirectTo: 'resetpassword', pathMatch: 'full'},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'register/privacy', redirectTo: 'privacy', pathMatch: 'full'},
  { path: 'register/terms', redirectTo: 'terms', pathMatch: 'full'},
  { path: 'privacy/register', redirectTo: 'register', pathMatch: 'full'},
  { path: 'terms/register', redirectTo: 'register', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
