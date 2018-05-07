import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SendEmailService } from '../../services/send-email.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  private resetPassForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private emailService: SendEmailService) {}

  onSubmit(resetPassForm){
    if(resetPassForm.valid){
      this.emailService.email = resetPassForm.value.email;     
      this.emailService.sendNewPass().subscribe(
        data => {
        console.log(data);
        })
        setTimeout(() => {
          alert(this.emailService.response.message);
          if(this.emailService.response.status === 200){
            this.router.navigateByUrl("/login");
          }     
          resetPassForm.reset();
        }, 2000);
    }else{
      console.log("Form valid: ", resetPassForm.valid);
    }
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): any {
    this.resetPassForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }
}
