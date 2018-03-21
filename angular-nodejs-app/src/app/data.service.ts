import { Injectable } from '@angular/core';
import { User } from './entities/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DataService {

  private usernameSource = new BehaviorSubject<String>("");
  private hideLoginSource = new BehaviorSubject<boolean>(false);
  currentUsername = this.usernameSource.asObservable();
  currentHideLogin = this.hideLoginSource.asObservable();

  changeUsername(username: String, hideLogin: boolean){
    this.usernameSource.next(username);
    this.hideLoginSource.next(hideLogin);
  }

  private users: User[] = [
    {
      firstName: 'Nikolay',
      lastName: 'Kanchev',
      username: 'nik',
      email: 'nikolay.kanchev@yahoo.com',
      password: '1234'
    },
    {
      firstName: 'Martin',
      lastName: 'Krastev',
      username: 'marto',
      email: 'marto@yahoo.com',
      password: '1234'
    },
    {
      firstName: '',
      lastName: '',
      username: 'admin',
      email: 'admin@yahoo.com',
      password: '1234'
    }
  ];
 
  constructor() { }

  public addUser(user: User) {
    this.users.push(user);
    // console.log(this.users);
  }
  public getUsers(): User[] {
    return this.users;
  }
  
  getLoggedUser(emailToCheck: string, passwordTocheck: string): User {
    for(let u of this.users){
      if (u.email === emailToCheck && u.password === passwordTocheck){
        this.changeUsername(u.username, true);
        return u;
      }
    }
  }
}
 
