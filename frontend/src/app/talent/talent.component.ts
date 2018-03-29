import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.scss']
})
export class TalentComponent implements OnInit {
  selectedFile = null;

   onFileSelected(event){
   this.selectedFile = event.target.files[0];

   }
   onUpload(){
     const fd = new FormData();
     fd.append('image', this.selectedFile);

   }
  constructor() { }

  ngOnInit() {

  }

}
