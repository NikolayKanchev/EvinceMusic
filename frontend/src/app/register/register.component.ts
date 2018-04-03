import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth1Service } from '../auth1.service';

import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  isPasswordTheSame: any;

  constructor(private fb: FormBuilder, private socialAuthService: AuthService, private authService: Auth1Service, private router: Router) { }

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
        // Now register with userData
        let name = userData.name;
        let nameParts = name.split(' ');

        this.authService.firstName = nameParts[0];
        this.authService.lastName = nameParts[1];
        this.authService.username = "" + nameParts[0][0] + nameParts[1][0];
        this.authService.email = userData.email;
        this.authService.password = "validated_with_social_media";
        
        this.authService.register().subscribe(data => {})
      }
    );
  }

  onSubmitRegister(registerForm){
    if(registerForm.valid){
      console.log("Form valid: ", registerForm.valid);
     
      this.authService.firstName = registerForm.value.firstName;
      this.authService.lastName = registerForm.value.lastName;
      this.authService.username = registerForm.value.username;
      this.authService.email = registerForm.value.email;
      this.authService.password = registerForm.value.password;

      this.authService.register().subscribe(data => {})
    }else{
      this.isPasswordTheSame = matchOtherValidator('password');
      console.log("Form valid: ", registerForm.valid);
    }
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): any {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      retypePassword: ["",[
        Validators.required, matchOtherValidator('password')
    ]]
    })
  }
}

export function matchOtherValidator(otherControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
          const subscription: Subscription = otherControl
              .valueChanges
              .subscribe(() => {
                  control.updateValueAndValidity();
                  subscription.unsubscribe();
              });
      }

      return (otherControl && control.value !== otherControl.value) ? {match: true} : null;
  };
}