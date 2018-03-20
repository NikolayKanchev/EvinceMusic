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
   emailToCheck: string;
   passwordToCheck: string;

   constructor(private ds: DataService) { }

   login(): Observable<boolean>{
       
        return Observable.of(true).do(val => {
            // this.loggedInUser = //what came back from the server.
            this.loggedUser = this.ds.getLoggedUser(this.emailToCheck, this.passwordToCheck);

            if(this.loggedUser === undefined){
                this.isLoggedIn = false;
            }else{
                this.isLoggedIn = true;
                if(this.loggedUser.username === "admin"){
                    this.redirectUrl = "/adminpage"
                }
            }
            
            // console.log(this.loggedUser);
            // console.log(this.redirectUrl);
         });
   }

   logout(): void{
       this.isLoggedIn = false;
   }


}
