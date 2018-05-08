import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class AccSettingsService {
  
  dbServerURL:string = "http://localhost:3001/";
  redirectUrl: string = ""; //- will store the attempted url
  response: any;
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<ServerResponce>{
    return this.http.post<ServerResponce>(this.dbServerURL + 'get-user', { "id": id });    
  }

  updateUser(): Observable<ServerResponce>{      
    return this.http.post<ServerResponce>(this.dbServerURL + 'update-user', 
    { 
        "userId": this.userId,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "username": this.username,
        "email": this.email,
        "password": this.password   
    });    
  }

}
interface ServerResponce{
    status: number,
    user: User,
    message: string
}