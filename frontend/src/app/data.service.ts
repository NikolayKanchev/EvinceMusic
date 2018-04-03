import { Injectable } from '@angular/core';
import { User } from './entities/user';


@Injectable()
export class DataService {

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
    },
    {
      firstName: 'Nikolay',
      lastName: 'Kanchev',
      username: 'nik',
      email: 'nikolaj.kanchev@gmail.com',
      password: '1234'
    },
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
      if ((u.email === emailToCheck && u.password === passwordTocheck) || (u.email === emailToCheck && passwordTocheck === "validated_with_social_media")){
        return u;
      }
    }
  }

  doesUserExist(email: String): boolean {
    let bul = false
    for(let u of this.users){
      if (u.email === email){
        bul =  true;
      }
    }
    return bul;
  }
}
 
