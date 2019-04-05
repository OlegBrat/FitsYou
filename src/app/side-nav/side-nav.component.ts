import { Component } from "@angular/core";
import { SidenavService } from "./sidenav.service";

@Component({
  selector: "side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"]
})
export class SideNavComponent {

  constructor(private sidenavService: SidenavService) {}

  moveTo(cloth: string) {
    this.sidenavService.moveTo(cloth);
  }
}
