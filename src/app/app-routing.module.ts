import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ShirtComponent } from "./clothes-com/shirt/shirt.component";
import { PantsComponent } from "./clothes-com/pants/pants.component";
import { CoatComponent } from "./clothes-com/coat/coat.component";
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "shirt", component: ShirtComponent },
  { path: "pants", component: PantsComponent },
  { path: "coat", component: CoatComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
