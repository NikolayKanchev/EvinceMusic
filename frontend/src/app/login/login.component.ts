import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth1Service } from '../auth1.service';
import { DataService } from '../data.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  hideLogin: boolean;

  constructor(private ds: DataService, private fb: FormBuilder, private authService: Auth1Service, private socialAuthService: AuthService, private router: Router) { }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        this.authService.emailToCheck = userData.email;
        this.authService.passwordToCheck = "validated_with_social_media";
        this.authService.login().subscribe(() => {
          this.router.navigateByUrl(this.authService.redirectUrl);
        })
      }
    );
  }

  onSubmitLogin(loginForm){
    
    if(loginForm.valid){
      this.authService.emailToCheck = loginForm.value.email;
      this.authService.passwordToCheck = loginForm.value.password;

      this.authService.login().subscribe(() => {
        this.router.navigateByUrl(this.authService.redirectUrl);
      })
    }else{
      console.log("Form valid: ", loginForm.valid);
    }
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): any {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }
}
