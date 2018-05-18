import { Component, OnInit } from '@angular/core';
import { Project } from '../../../entities/project';
import { ProjectService } from '../../../services/project.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../redux/store/store';
import { ProjectActions } from '../../../redux/actions/project.actions';

@Component({
  selector: 'app-manage-home-page',
  templateUrl: './manage-home-page.component.html',
  styleUrls: ['./manage-home-page.component.scss']
})
export class ManageHomePageComponent implements OnInit {

  // private projects: any;

  // private projectToDelete: string = '259';

  // private project: Project = {
  //   id: null,
  //   pick: "no pick",
  //   title: "title",
  //   date: "date",
  //   text: "text",
  // };

  // private projectToUpdate: Project = {
  //   id: '270',
  //   pick: "no pick ************",
  //   title: "title ***********",
  //   date: "date *************",
  //   text: "text *************",
  // };

  constructor(private projectService: ProjectService, private ngRedux: NgRedux<IAppState>,
    private projectActions: ProjectActions ) { }

  ngOnInit() {
    
  }

  // getProjects(){
  //   this.projectActions.getProjects();
    
  //   this.ngRedux.select(state => state.projects).subscribe(res => { 
  //     this.projects = res.projects;  
  //     console.log(this.projects);
  //   })
  // }

  // addProject(){
  //   this.projectActions.addProject(this.project);
  // }

  // deleteProject(){
  //   this.projectActions.deleteProject(this.projectToDelete);
  // }

  // updateProject(){
  //   this.projectActions.updateProject(this.projectToUpdate);

  // }

}
