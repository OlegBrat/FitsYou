import { Injectable } from "@angular/core";
import { UserData } from "../models/user.model";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLogin = false;
  private userLogin = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, userName: string, password: string) {
    const newUser: UserData = {
      _id: null,
      email,
      userName,
      password
    };
    console.log(newUser);
    this.http
      .post("http://localhost:3000/api/signup", newUser)
      .subscribe(() => {
        this.router.navigate(["/login"]);
      });
  }
  login(userName: string, password: string) {
    const loginUser = {
      userName,
      password
    };
    this.http
      .post<{ user: any; messege: string; size: any }>(
        "http://localhost:3000/api/login",
        loginUser
      )
      .subscribe(data => {
        if (!data.user) {
          alert(data.messege);
        }
        this.isLogin = true;
        this.userLogin.next(this.isLogin);
        if (!data.size) {
          this.router.navigate(["/mySize"]);
        } else {
          this.router.navigate(["/"]);
        }
        this.addToLocalStorage(data.user._id);
      });
  }
  addToLocalStorage(userId: string) {
    localStorage.setItem("userId", userId);
  }
  removeFromLocalStorage() {
    localStorage.removeItem("userId");
  }

  loginLiscener(){
    return this.userLogin.asObservable();
  }
  logOut() {
    this.isLogin = false;
    this.userLogin.next(this.isLogin);
    this.removeFromLocalStorage();
  }
}
