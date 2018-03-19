import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { DataService } from './data.service';

@Injectable()
export class AuthService{
   redirectUrl: string; //- will store the attempted url
   isLoggedIn = false;
   loggedUser: any;

   constructor(private ds: DataService) { }

   login(): Observable<boolean>{
        return Observable.of(true).delay(1000).do(val => {

            // this.loggedInUser = //what came back from the server.

            console.log(this.loggedUser);


            this.isLoggedIn = true;
         });
   }

   logout(): void{
       this.isLoggedIn = false;
   }
}
