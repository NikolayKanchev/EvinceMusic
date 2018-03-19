import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  private resetForm: FormGroup;
  // emailPlaceholder: string = "E-mail";

  // constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }
  constructor(private fb: FormBuilder, private router: Router) { }

  onSubmitLogin(loginForm){
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
    this.resetForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    })
  }
}
