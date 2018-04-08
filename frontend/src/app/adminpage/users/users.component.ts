import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { DataService } from '../../data.service';
import { MatTableDataSource } from '@angular/material';
import { Auth1Service } from '../../auth1.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private users: User[];
  user: User;

  displayedColumns = ['firstName', 'lastName', 'username', 'email'];
  dataSource = new MatTableDataSource();
  
  constructor(private ds: DataService, private authService: Auth1Service) { }

  ngOnInit() {
    this.users = this.ds.getUsers();
    this.authService.getUsers().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }

  onUserClicked(obj){
    console.log("user", obj.user);
  }
}
