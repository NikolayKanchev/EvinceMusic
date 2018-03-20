import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http/src/client';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.scss']
})
export class TalentComponent implements OnInit {
  selectedFile = null;

   onFileSelected(event){
    // this.selectedFile = event.target.files[0];

   }
   onUpload(){
    // const fd = new FormData();
     //fd.append('image', this.selectedFile);

   }
  constructor(/*private http: HttpClient*/) { }

  ngOnInit() {

  }

}
