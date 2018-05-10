import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Auth1Service } from '../../../services/auth1.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns = ['firstName', 'lastName', 'username', 'email'];
  dataSource = new MatTableDataSource();
  
  constructor(private usersService: UserService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }
}
