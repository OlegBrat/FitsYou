import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-shirt",
  templateUrl: "./shirt.component.html",
  styleUrls: ["./shirt.component.css"]
})
export class ShirtComponent implements OnInit {
  shirtForm = new FormGroup({
    shirtLength: new FormControl(),
    shirtBust: new FormControl(),
    shirtSholder: new FormControl()
  });
  constructor() {}

  ngOnInit() {
    this.shirtForm.setValue({ shirtLength: 0, shirtBust: 0, shirtSholder: 0 });
  }
  onFormSubmit() {}
}
