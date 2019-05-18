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
  sizeFromDb: SizeData;

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
          _id: sizeFromDB.size._id,
          userId: id,
          height: sizeFromDB.size.height,
          weight: sizeFromDB.size.weight,
          legsLength: sizeFromDB.size.legsLength,
          legsHipLine: sizeFromDB.size.legsHipLine,
          bodyLength: sizeFromDB.size.bodyLength,
          bodyBust: sizeFromDB.size.bodyBust,
          bodySholder: sizeFromDB.size.bodySholder,
          bodySleeves: sizeFromDB.size.bodySleeves
        };
        this.sizeFromDb = sizeData;
        this.userSize.next(sizeData);
      });
  }
  getSizeLiscener() {
    return this.userSize.asObservable();
  }
  saveEdit(sizeModel: SizeData) {
    const id = localStorage.getItem("userId");

    console.log("in edit");
    console.log(this.sizeFromDb._id);

    this.http
      .put("http://localhost:3000/api/editSize/" + this.sizeFromDb._id, sizeModel)
      .subscribe(response => {
        console.log("in put");

        this.router.navigate(["/"]);
      });
  }
}
