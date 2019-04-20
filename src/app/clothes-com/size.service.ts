import { Injectable } from "@angular/core";
import { SizeData } from "../models/size.model";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SizeService {
  private userSize = new Subject<SizeData>();

  constructor(private router: Router, private http: HttpClient) {}
  addSize(sizeModel: SizeData) {
    this.http
      .post("http://localhost:3000/api/mySize", sizeModel)
      .subscribe(() => {
        this.router.navigate(["/"]);
      });
  }

  getUserSize() {
    const id = localStorage.getItem("userId");
    console.log(id);
    this.http
      .get<{ size: any; message: string }>(
        "http://localhost:3000/api/getsize/" + id
      )
      .subscribe(sizeFromDB => {
        console.log(sizeFromDB);
        const sizeData: SizeData = {
          userId: null,
          height: sizeFromDB.size.height,
          weight: sizeFromDB.size.weight,
          legsLength: sizeFromDB.size.legsLength,
          legsHipLine: sizeFromDB.size.legsHipLine,
          bodyLength: sizeFromDB.size.bodyLength,
          bodyBust: sizeFromDB.size.bodyBust,
          bodySholder: sizeFromDB.size.bodySholder,
          bodySleeves: sizeFromDB.size.bodySleeves
        };
        this.userSize.next(sizeData);
      });
  }
  getSizeLiscener() {
    return this.userSize.asObservable();
  }
}
