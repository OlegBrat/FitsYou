import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private authService:AuthService) { }

login(loginForm:NgForm){
  console.log(loginForm);
this.authService.login(loginForm.value.userName,loginForm.value.password);
}

}
