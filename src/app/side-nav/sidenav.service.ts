import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn:"root"
})
export class SidenavService {
  constructor(private router: Router) {}

  moveTo(cloth: string) {
    this.router.navigate(["/" + cloth]);
  }
}
