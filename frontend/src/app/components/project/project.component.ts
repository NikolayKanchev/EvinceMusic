import { Component, OnInit } from '@angular/core';
import { Project } from '../../entities/project';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../redux/store/store';
import { ProjectActions } from '../../redux/actions/project.actions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  project: Project;
  

  constructor(private ngRedux: NgRedux<IAppState>,
    private projectActions: ProjectActions) { }

  ngOnInit() {
    let projectId = sessionStorage.getItem("projectId");
    // console.log(projectId);
    
    this.projectActions.getProjects();

    this.ngRedux.select(state => state.projects).subscribe(res => { 
      res.projects.forEach(p => {
        if(p.id == projectId){
          this.project = p;
        }
      });
    });
    
  }

}
