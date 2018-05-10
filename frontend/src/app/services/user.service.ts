import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { User } from './../entities/user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  dbServerURL:string = "http://localhost:3001/";

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.dbServerURL + 'get-users');
  }

}
