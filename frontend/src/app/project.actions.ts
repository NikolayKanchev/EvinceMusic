import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store/store';
import { Project } from './entities/project';

@Injectable()
export class ProjectActions {
 
  constructor (
   private ngRedux: NgRedux<IAppState>) {}
   
   static ADD_PROJECT: string = 'ADD_PROJECT';
   static ADD_PROJECT_SUCCESS: string = 'ADD_PROJECT_SUCCESS';
   static ADD_PROJECT_FAILURE: string = 'ADD_PROJECT_FAILURE';

   static GET_PROJECTS: string = 'GET_PROJECTS';
   static GET_PROJECTS_SUCCESS: string = 'GET_PROJECTS_SUCCESS';
   static GET_PROJECTS_FAILURE: string = 'GET_PROJECTS_FAILURE';

   static UPDATE_PROJECT: string = 'UPDATE_PROJECT';
   static UPDATE_PROJECT_SUCCESS: string = 'UPDATE_PROJECT_SUCCESS';
   static UPDATE_PROJECT_FAILURE: string = 'UPDATE_PROJECT_FAILURE';

   static DELETE_PROJECT: string = 'DELETE_PROJECT';
   static DELETE_PROJECT_SUCCESS: string = 'DELETE_PROJECT_SUCCESS';
   static DELETE_PROJECT_FAILURE: string = 'DELETE_PROJECT_FAILURE';

   getProjects() {
     this.ngRedux.dispatch({
       type: ProjectActions.GET_PROJECTS
     });
   }
   
   addProject(project: Project) : void {
     this.ngRedux.dispatch({
       type: ProjectActions.ADD_PROJECT,
       payload: project
       //Example of passing multiple parameters to reducer by passing an object
       //payload: {baby, sitterName}
     })
   }

   updateProject(project: Project) : void {     
    this.ngRedux.dispatch({
      type: ProjectActions.UPDATE_PROJECT,
      payload: project
    })
  }

  deleteProject(id: string) : void {
    this.ngRedux.dispatch({
      type: ProjectActions.DELETE_PROJECT,
      payload: { id }
    })
  }
}
