import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
// import * as socketIo from 'socket.io-client';


@Injectable()
export class SendEmailService {
  dbServerURL:string = "http://localhost:3001/";
  redirectUrl: string = ""; //- will store the attempted url
  email: string;

  constructor(private http: HttpClient) { }

  
  sendNewPass(): Observable<ServerResponce>{
       
    return this.http.post<ServerResponce>(this.dbServerURL + 'reset-pass', 
    { 
        "email":this.email
    });    
  }
}

interface ServerResponce{
  status: number,
  message: string
}