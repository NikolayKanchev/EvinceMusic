import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  onSubmitLogin(loginForm){
    if(loginForm.valid){
      console.log("Form valid: ", loginForm.valid);
      this.authService.login().subscribe(() => {
        console.log("Now I am logged in!");
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
