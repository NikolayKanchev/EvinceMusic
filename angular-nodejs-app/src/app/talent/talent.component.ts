import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.scss']
})
export class TalentComponent implements OnInit {
   onFileSelected(event){
     console.log(event);
   }
  constructor() { }

  ngOnInit() {
  }

}
