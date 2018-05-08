import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth1Service } from '../../services/auth1.service';
import { AccSettingsService } from '../../services/acc-settings.service';

@Component({
    selector: 'app-acc-settings',
    templateUrl: './acc-settings.component.html',
    styleUrls: ['./acc-settings.component.scss']
  })
  export class AccSettingsComponent implements OnInit {
  private accSettingsForm: FormGroup;
  loggedUserId: string;
  data: any;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  serverMessage: string = "";

  constructor(private fb: FormBuilder, private authService: Auth1Service, private accService: AccSettingsService, private router: Router) { }

  onSubmitSave(accSettingsForm){
    if(accSettingsForm.valid){

      if(this.firstName === this.data.firstName && this.lastName === this.data.lastName
         && this.username === this.data.username && this.email === this.data.email
         && this.password === ""){
      }else{
        this.accService.userId = this.loggedUserId;
        this.accService.firstName = this.firstName;
        this.accService.lastName = this.lastName;
        this.accService.username = this.username;
        this.accService.email = this.email;
        this.accService.password = this.password;      
        

        this.accService.updateUser().subscribe(data => {

          if(data.status === 200){
            this.serverMessage = data.message;
            accSettingsForm.reset();
            setTimeout(() => {
              this.router.navigateByUrl(this.accService.redirectUrl); 
            }, 4000);
          }
        });
    
        
      }

    }else{
      console.log("Form valid: ", accSettingsForm.valid);
    }
  }

  ngOnInit() {
    this.createForm();
    this.authService.currentLoggedUserId.subscribe(loggedUserId => this.loggedUserId = loggedUserId);
    this.accService.getUser(this.loggedUserId).subscribe(data => {
      this.data = data[0];
      this.firstName = data[0].firstName;
      this.lastName = data[0].lastName;
      this.username = data[0].username;
      this.email = data[0].email;
      this.password = "";
    });
  }

  createForm(): any {
    this.accSettingsForm = this.fb.group({
      firstName: [""],
      lastName: [""],
      username: [""],
      email: [""],
      password: [""],
    })
  }
}
