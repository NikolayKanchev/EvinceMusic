import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GlobalpartnershipComponent } from './globalpartnership/globalpartnership.component';
import { LoginComponent } from './login/login.component';
import { PromoteComponent } from './promote/promote.component';
import { RegisterComponent } from './register/register.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PrivatelessonsComponent } from './privatelessons/privatelessons.component';
import { ProfessionalServicesComponent } from './professional-services/professional-services.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'privatelessons', component: PrivatelessonsComponent},
  { path: 'globalpartnership', component: GlobalpartnershipComponent},
  { path: 'login', component: LoginComponent},
  { path: 'promote', component: PromoteComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'home', component: HomeComponent },
  { path: 'globalpartnership', component: GlobalpartnershipComponent },
  { path: 'login', component: LoginComponent },
  { path: 'promote', component: PromoteComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'professionalservices', component: ProfessionalServicesComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
