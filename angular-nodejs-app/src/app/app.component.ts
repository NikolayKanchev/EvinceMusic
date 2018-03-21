import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { User } from './entities/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  username: String;
  hideLogin: boolean;
  options = [
    {value: 'acc-settings', viewValue: 'Account settings'},
    // {value: '', viewValue: ''},
    {value: 'log-out', viewValue: 'Log Out'}
  ];

  constructor(private ds: DataService){}

  ngOnInit(){
    this.ds.currentUsername.subscribe(username => this.username = username);
    this.ds.currentHideLogin.subscribe(hideLogin => this.hideLogin = hideLogin);
  }
}
