import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private users: User[];
  user: User;
  
  constructor(private ds: DataService) { }

  ngOnInit() {
    this.users = this.ds.getUsers();
  }

  onUserClicked(obj){
    console.log("user", obj.user);
  }
}
