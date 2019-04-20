import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SizeService } from "../clothes-com/size.service";
import { SizeData } from "../models/size.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-my-size",
  templateUrl: "./my-size.component.html",
  styleUrls: ["./my-size.component.css"]
})
export class MySizeComponent implements OnInit {
  private sizeSub: Subscription;

  heightData: number;
  weightData: number;
  legsLengthData: number;
  hipLineData: number;
  bodyLengthData: number;
  bodyBustData: number;
  bodySholderData: number;
  bodySleevesData: number;

  constructor(private sizeService: SizeService) {}

  ngOnInit() {
    this.sizeService.getUserSize();
    this.sizeSub = this.sizeService.getSizeLiscener().subscribe(size => {
      this.heightData = size.height;
      this.weightData = size.weight;
      this.legsLengthData = size.legsLength;
      this.hipLineData = size.legsHipLine;
      this.bodyLengthData = size.bodyLength;
      this.bodyBustData = size.bodyBust;
      this.bodySholderData = size.bodySholder;
      this.bodySleevesData = size.bodySleeves;
    });
  }

  addSize(sizeForm: NgForm) {
    const userIdFromLS = localStorage.getItem("userId");
    const userSize: SizeData = {
      userId: userIdFromLS,
      height: sizeForm.value.height,
      weight: sizeForm.value.weight,
      legsLength: sizeForm.value.legsLength,
      legsHipLine: sizeForm.value.hipLine,
      bodyLength: sizeForm.value.bodyLength,
      bodyBust: sizeForm.value.bodyBust,
      bodySholder: sizeForm.value.bodySholder,
      bodySleeves: sizeForm.value.bodySleeves
    };
    this.sizeService.addSize(userSize);
    console.log(userSize);
  }
}
