import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService{
   redirectUrl: string; //- will store the attempted url
   isLoggedIn = false;
   loggedUser: any;
   emailToCheck: string;
   passwordToCheck: string;

    private usernameSource = new BehaviorSubject<String>("");
    private hideLoginSource = new BehaviorSubject<boolean>(false);
    currentUsername = this.usernameSource.asObservable();
    currentHideLogin = this.hideLoginSource.asObservable();

    changeUsername(username: String, hideLogin: boolean){
        this.usernameSource.next(username);
        this.hideLoginSource.next(hideLogin);
      }

   constructor(private ds: DataService) { }

   login(): Observable<boolean>{
       
        return Observable.of(true).do(val => {
            // this.loggedInUser = //what came back from the server.
            this.loggedUser = this.ds.getLoggedUser(this.emailToCheck, this.passwordToCheck);

            if(this.loggedUser === undefined){
                this.isLoggedIn = false;
            }else{
                this.isLoggedIn = true;

                this.changeUsername(this.loggedUser.username, true);

                if(this.redirectUrl === undefined){
                    this.redirectUrl = "/home"
                }
                
                if(this.loggedUser.username === "admin"){
                    this.redirectUrl = "/adminpage"
                }
            }
         });
   }

   logout(): void{
       this.isLoggedIn = false;
   }


}

