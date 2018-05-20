import { Component, OnInit } from '@angular/core';
import { Project } from '../../entities/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project: Project;
  

  constructor() { }

  ngOnInit() {
    
  }

}
