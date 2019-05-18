import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-pants",
  templateUrl: "./pants.component.html",
  styleUrls: ["./pants.component.css"]
})
export class PantsComponent implements OnInit {
  pantsForm = new FormGroup({
    pantsLength: new FormControl(),
    pantsHipLine: new FormControl()
  });
  constructor() {}

  ngOnInit() {
    this.pantsForm.setValue({ pantsLength: 0, pantsHipLine: 0});
  }
    onFormSubmit() {}
}
