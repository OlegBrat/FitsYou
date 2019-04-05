import { Injectable } from "@angular/core";
import { UserData } from "../models/user.model";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, userName: string, password: string) {
    const newUser: UserData = {
      email: email,
      userName: userName,
      password: password
    };
    console.log(newUser);
    this.http.post("http://localhost:3000/api/signup", newUser)
      .subscribe(() => {
        this.router.navigate(["/login"]);
      });
  }
  login(userName:string,password:string){

  }
}
