import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})



export class ContactsComponent implements OnInit {
   name: string;
   email: string;
   subject: string;
   message: string;


  
  constructor() { }

  ngOnInit() {
  }
  
  processForm(){
    const msg = `Sender: ${this.name} his email is ${this.email} Subject: ${this.subject} Message: ${this.message}`
    alert(msg);
  }

 
}
