import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  isLogin = this.authService.isLogin;
  private loginSub: Subscription;

  constructor(private authService: AuthService) {
    this.loginSub = this.authService.loginLiscener().subscribe(login => {
      this.isLogin = login;
      console.log(this.isLogin);
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
