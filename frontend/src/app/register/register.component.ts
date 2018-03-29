import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;

  // constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  constructor(private fb: FormBuilder, private router: Router) { }

  onSubmitLogin(registerForm){
    // if(loginForm.valid){
    //   console.log("Form valid: ", loginForm.valid);
    //   this.authService.login().subscribe(() => {
    //     console.log("Now I am logged in!");
    //     this.router.navigateByUrl(this.authService.redirectUrl);
    //   })
    // }else{
    //   console.log("Form valid: ", loginForm.valid);
    // }
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
      retypePassword: ["", Validators.required]
    })
  }
}
