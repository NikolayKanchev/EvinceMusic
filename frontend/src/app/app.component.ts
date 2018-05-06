import { Component, OnInit } from '@angular/core';
import { User } from './entities/user';
import { FormControl } from '@angular/forms';
import { Auth1Service } from './services/auth1.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  username: String;
  hideLogin: boolean;

  constructor(private authService: Auth1Service){}

  ngOnInit(){
    this.authService.currentUsername.subscribe(username => this.username = username);
    this.authService.currentHideLogin.subscribe(hideLogin => this.hideLogin = hideLogin);
  }

  onSubmitLoguot(){
    this.authService.logout();
    this.hideLogin = false;
  }

}
