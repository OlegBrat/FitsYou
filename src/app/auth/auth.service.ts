import { Injectable } from "@angular/core";
import { UserData } from "../models/user.model";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLogin = false;
  private userLogin = new Subject<boolean>();
  private token: string;
  private tokenTimer: any;
  private userId: string;

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
      .post<{
        user: any;
        messege: string;
        size: any;
        token: string;
        expiresIn: number;
      }>("http://localhost:3000/api/login", loginUser)
      .subscribe(data => {
        const token = data.token;
        this.token = token;
        this.userId = data.user._id;
        if (token) {
          const expiresInDuration = data.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isLogin = true;
          this.userLogin.next(this.isLogin);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 10000
          );
          localStorage.setItem("token", data.token);
          if (!data.size) {
            this.router.navigate(["/mySize"]);
          } else {
            this.router.navigate(["/"]);
          }
          this.saveAuthData(token, expirationDate, this.userId);
        }
      });
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) return;
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isLogin = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.userLogin.next(this.isLogin);
    }
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  loginLiscener() {
    return this.userLogin.asObservable();
  }

  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

  logOut() {
    this.token = null;
    this.userId = null;
    this.isLogin = false;
    clearTimeout(this.tokenTimer);
    this.userLogin.next(this.isLogin);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }
}
