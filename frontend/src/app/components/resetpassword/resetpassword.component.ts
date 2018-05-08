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
  message: string;

  constructor(private fb: FormBuilder, private router: Router, private emailService: SendEmailService) {}

  onSubmit(resetPassForm){
    if(resetPassForm.valid){
      this.emailService.email = resetPassForm.value.email;     
      this.emailService.sendNewPass().subscribe(
        data => {
          console.log(data);

          if(data.status === 200){

            this.message = data.message;

            setTimeout(() => {
              this.router.navigateByUrl("/login"); 
            }, 3000);
          }
            resetPassForm.reset();
        })
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
