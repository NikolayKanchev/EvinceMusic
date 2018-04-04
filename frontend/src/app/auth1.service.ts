import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './entities/user';
import { Router } from '@angular/router';

@Injectable()
export class Auth1Service{
    errorMessage: string;
    redirectUrl: string = ""; //- will store the attempted url
    isLoggedIn = false;
    loggedUser: any;
    emailToCheck: string;
    passwordToCheck: string;

//    ****** for the register part ******
   userOnRegister: any = undefined;
   userExist: boolean;
   firstName: string;
   lastName: string;
   username: string;
   email: string;
   password: string;
//    ******************************

    private errorMessageSource = new BehaviorSubject<String>("");
    currentErrorMessage = this.errorMessageSource.asObservable();

    changeErrorMessage(errorMessage: string){
        this.errorMessageSource.next(errorMessage);
    }


    private usernameSource = new BehaviorSubject<String>("");
    private hideLoginSource = new BehaviorSubject<boolean>(false);
    currentUsername = this.usernameSource.asObservable();
    currentHideLogin = this.hideLoginSource.asObservable();

    changeUsername(username: String, hideLogin: boolean){
        this.usernameSource.next(username);
        this.hideLoginSource.next(hideLogin);
      }

   constructor(private ds: DataService, private router: Router) { }

   login(): Observable<boolean>{
       
        return Observable.of(true).do(val => {
            // this.loggedInUser = //what came back from the server.
            this.loggedUser = this.ds.getLoggedUser(this.emailToCheck, this.passwordToCheck);

            if(this.loggedUser === undefined){
                this.isLoggedIn = false;
                this.router.navigateByUrl(this.redirectUrl = 'error');
                this.changeErrorMessage("It seems, that you need to register first !");
            }else{
                this.isLoggedIn = true;

                this.changeUsername(this.loggedUser.username, true);
                
                if(this.redirectUrl === "error"){
                    this.router.navigateByUrl(this.redirectUrl = 'home');
                }else{
                    this.router.navigateByUrl(this.redirectUrl);
                }
                
                if(this.loggedUser.username === "admin"){
                    this.router.navigateByUrl(this.redirectUrl = 'adminpage');
                }
            }
         });
   }

   logout(): void{
       this.isLoggedIn = false;
   }

   register(): Observable<boolean>{
       
    return Observable.of(true).do(val => {

        this.userExist = this.ds.doesUserExist(this.email);

        if (!this.userExist){
            this.userOnRegister = new User();
            this.userOnRegister.firstName = this.firstName;
            this.userOnRegister.lastName = this.lastName;
            this.userOnRegister.username = this.username;
            this.userOnRegister.email = this.email;
            this.userOnRegister.password = this.password;

            this.ds.addUser(this.userOnRegister);

            // ******* the user will be logged in *******
            this.emailToCheck = this.email;
            this.passwordToCheck = this.password;

            console.log(this.firstName, this.username, this.email, this.password);
            

            this.login().subscribe(() => {
                this.router.navigateByUrl(this.redirectUrl = 'home');
            })
            return true;
        }else{
            if (this.isLoggedIn){
                this.router.navigateByUrl(this.redirectUrl = 'home');
            }else{
                this.router.navigateByUrl(this.redirectUrl = 'error');
                this.changeErrorMessage("...There is an account with the same e-mail !!!... Try to login insted !");
            }
            
            return false;
        }        
     });
    }

    isManager(): boolean {
        if(this.isLoggedIn && this.loggedUser.email === "admin@yahoo.com"){
            return true;
        }else{
            this.router.navigate(['error']);
            this.changeErrorMessage("You don't have Admin privileges !!!");
            return false;
        }
    }
}


