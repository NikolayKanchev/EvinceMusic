import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Material } from './material';
import { AuthGuard } from './guards/auth.guard';
import { UserAccessGuard } from './guards/auth.userAccessGuard';
import { AdminAccess } from './guards/auth.adminGuard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PromoteComponent } from './components/promote/promote.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfessionalServicesComponent } from './components/professional-services/professional-services.component';
import { TalentComponent } from './components/talent/talent.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { AccSettingsComponent } from './components/acc-settings/acc-settings.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";
import { Auth1Service } from './services/auth1.service';
import { ErrorComponent } from './components/error/error.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
import { UsersComponent } from './components/adminpage/users/users.component';
import { ManageHomePageComponent } from './components/adminpage/manage-home-page/manage-home-page.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { SendEmailService } from './services/send-email.service';
import { AccSettingsService } from './services/acc-settings.service';
import { UserService } from './services/user.service';
import { ProjectService } from './services/project.service';

import { rootReducer } from './redux/store/store'; // Added this to get the root reducer

import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { IAppState } from './redux/store/store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { ProjectActions } from './redux/actions/project.actions';

import { createEpicMiddleware, combineEpics } from "redux-observable";
import { createLogger } from "redux-logger";
import { ProjectEpic } from './redux/epics/project.epic';
import { AllProjectsComponent } from './components/adminpage/manage-home-page/all-projects/all-projects.component';
import { AddNewProjectComponent } from './components/adminpage/manage-home-page/add-new-project/add-new-project.component';
import { FileuploadService } from './services/fileupload.service';
import { ProjectComponent } from './components/project/project.component';

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
    FileSelectDirective,
    UsersComponent,
    ManageHomePageComponent,
    TermsComponent,
    PrivacyComponent,
    AllProjectsComponent,
    AddNewProjectComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Material,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    HttpModule,
    NgReduxModule,   NgReduxRouterModule.forRoot()
  ],
  providers: [Auth1Service, SendEmailService, UserService, AccSettingsService, FileuploadService, AuthGuard, UserAccessGuard, AdminAccess, ProjectActions, 
    ProjectService, ProjectEpic,
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter, private projectEpic: ProjectEpic) { 
      
      const rootEpic = combineEpics(
        // Each epic is referenced here.
        this.projectEpic.getProjects,
        this.projectEpic.addProject,
        this.projectEpic.deleteProject,
        this.projectEpic.updateProject
      );

      // Middleware
      const middleware = [
        createEpicMiddleware(rootEpic), createLogger({ level: 'info', collapsed: true })
      ];
      
      this.ngRedux.configureStore(
        rootReducer,
        {}, middleware,[ devTool.isEnabled() ? devTool.enhancer() : f => f]);
  }
 }
