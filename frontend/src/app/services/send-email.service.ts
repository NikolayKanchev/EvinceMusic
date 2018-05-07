import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import * as socketIo from 'socket.io-client';


@Injectable()
export class SendEmailService {
  dbServerURL:string = "http://localhost:3001/";
  email: {string};



  constructor(private http: HttpClient) { }

  
  sendNewPass(): Observable<boolean>{
       
    return Observable.of(true).do(val => {

        const req = this.http.post<ServerResponce>(this.dbServerURL + 'reset-pass',
            {"email":this.email})
            .subscribe(
                res => {
                    if (res.status === 200){            
                        console.log(res);                      
                        return true;
                    }else{                       
                      console.log(res);
                        return false;
                    }           
                },
                err => {
                    console.log("Request error !");
                    return false;                    
                }
            );
         });
    }
}

interface ServerResponce{
  status: number,
  message: string
}