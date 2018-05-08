import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './../entities/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { get } from 'selenium-webdriver/http';

@Injectable()
export class Auth1Service{
    errorMessage: string;
    redirectUrl: string = ""; //- will store the attempted url
    isLoggedIn = false;
    loggedUserUsername: any;
    emailToCheck: string;
    passwordToCheck: string;
    dbServerURL:string = "http://localhost:3001/";

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


    private usernameSource = new BehaviorSubject<string>("");
    private hideLoginSource = new BehaviorSubject<boolean>(false);
    private loggedUserId = new BehaviorSubject<string>("");
    currentUsername = this.usernameSource.asObservable();
    currentHideLogin = this.hideLoginSource.asObservable();
    currentLoggedUserId = this.loggedUserId.asObservable();

    changeUsername(username: string, hideLogin: boolean, id: string){
        this.usernameSource.next(username);
        this.hideLoginSource.next(hideLogin);
        this.loggedUserId.next(id);
      }

   constructor(private router: Router, private http: HttpClient) { }

   login(): Observable<boolean>{
       
        return Observable.of(true).do(val => {
            // this.loggedInUser = //what came back from the server.
            const req = this.http.post<ServerResponce>( this.dbServerURL + 'login',
            {
                'email': this.emailToCheck,
                'password': this.passwordToCheck
            })
                .subscribe(
                    res => {
                        console.log(res);

                        if(res.status === 403){
                            this.isLoggedIn = false;
                            this.router.navigateByUrl(this.redirectUrl = 'error');
                            this.changeErrorMessage("It seems, that you need to register first !");
                        }else{
                            this.isLoggedIn = true;
            
                            this.changeUsername(res.message, true, res.userId);
                            this.loggedUserUsername = res.message;
                            
                            if(this.redirectUrl === "error"){
                                this.router.navigateByUrl(this.redirectUrl = 'home');
                            }else{
                                this.router.navigateByUrl(this.redirectUrl);
                            }
                            
                            if(res.message === "ADMIN"){
                                this.router.navigateByUrl(this.redirectUrl = 'adminpage');
                            }
                        }
                },
                err => {
                    console.log("Error occured !");                    
                }
            );
         });
   }

   logout(): void{
       this.isLoggedIn = false;
       this.changeUsername("", false, "");       
   }

   register(): Observable<boolean>{
       
    return Observable.of(true).do(val => {

        this.userOnRegister = new User();
        this.userOnRegister.firstName = this.firstName;
        this.userOnRegister.lastName = this.lastName;
        this.userOnRegister.username = this.username;
        this.userOnRegister.email = this.email;
        this.userOnRegister.password = this.password;

        const req = this.http.post<ServerResponce>(this.dbServerURL + 'signup',
            this.userOnRegister)
            .subscribe(
                res => {
                    console.log(res);

                    if (res.status === 200){
            
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
                },
                err => {
                    console.log("Error occured !");                    
                }
            );
         });
    }

    isManager(): boolean {
        if(this.isLoggedIn && this.loggedUserUsername === "ADMIN"){
            return true;
        }else{
            this.router.navigate(['error']);
            this.changeErrorMessage("You don't have Admin privileges !!!");
            return false;
        }
    }

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.dbServerURL + 'get-users');
    }
}

interface ServerResponce{
    status: number,
    message: string,
    userId: string
}

interface GetUsers{
    status: number,
    message: string,
    users: User[]
}