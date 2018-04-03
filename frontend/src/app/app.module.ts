import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Material } from './material';
import { AuthGuard } from './auth.guard';
import { DataService } from './data.service';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PromoteComponent } from './promote/promote.component';
import { RegisterComponent } from './register/register.component';
import { ProfessionalServicesComponent } from './professional-services/professional-services.component';
import { TalentComponent } from './talent/talent.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AccSettingsComponent } from './acc-settings/acc-settings.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";
import { Auth1Service } from './auth1.service';
import { ErrorComponent } from './error/error.component';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("218473048733958")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("748841568302-vbt7vum28md5fcrcsr9gr2pkm75ir14l.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PromoteComponent,
    RegisterComponent,
    ProfessionalServicesComponent,
    TalentComponent,
    ContactsComponent,
    ResetpasswordComponent,
    AdminpageComponent,
    AccSettingsComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Material,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [Auth1Service, AuthGuard, DataService, 
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
