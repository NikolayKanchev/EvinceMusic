import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { User } from './entities/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  username: String;

  constructor(private ds: DataService){

  }

  ngOnInit(){
    this.ds.currentUsername.subscribe(username => this.username = username);
    // console.log(this.loggedUser);
  }
}
