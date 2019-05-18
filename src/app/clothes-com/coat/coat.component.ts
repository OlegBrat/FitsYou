import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-coat",
  templateUrl: "./coat.component.html",
  styleUrls: ["./coat.component.css"]
})
export class CoatComponent implements OnInit {
  coatForm = new FormGroup({
    coatLength:new FormControl(),
    coatBust: new FormControl(),
    coatSholder: new FormControl()

  });
  constructor() {}
  ngOnInit() {}
  onFormSubmit() {}
}
