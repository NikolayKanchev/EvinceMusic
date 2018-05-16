import { ProjectService } from './../app/services/project.service';
import { ProjectActions } from "./project.actions";
import { ActionsObservable } from "redux-observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectEpic {

constructor(private projectService: ProjectService) {}

getProjects = (action$: ActionsObservable<any>) => {
  return action$.ofType(ProjectActions.GET_PROJECTS) // Listen for this action
    .mergeMap(({payload}) => { 
        return this.projectService.getProjects() //get projects
          .map((result: any[]) => ({ // when web service responds with success, call this action with payload that came back from webservice
            type: ProjectActions.GET_PROJECTS_SUCCESS,
            payload: result
          }))
          .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
            type: ProjectActions.GET_PROJECTS_FAILURE,
            payload: error
        }));
    });
  }

  addProject = (action$: ActionsObservable<any>) => {
    return action$.ofType(ProjectActions.ADD_PROJECT) // Listen for this action
      .mergeMap(({ payload }) => { 
        return this.projectService.addProject(payload) // addProject
            .map((result: any) => ({ // when web service responds with success, call this action with payload that came back from webservice
              type: ProjectActions.ADD_PROJECT_SUCCESS,
              payload: result
            }))
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: ProjectActions.ADD_PROJECT_FAILURE,
              payload: error
            }));
      });
  }

  deleteProject = (action$: ActionsObservable<any>) => {
    return action$.ofType(ProjectActions.DELETE_PROJECT) // Listen for this action
      .mergeMap(({ payload }) => { 
        return this.projectService.deleteProject(payload) // deleteProject
            .map((result: any) => ({ // when web service responds with success, call this action with payload that came back from webservice
              type: ProjectActions.DELETE_PROJECT_SUCCESS,
              payload: result
            }))
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: ProjectActions.DELETE_PROJECT_FAILURE,
              payload: error
            }));
      });
  }

  updateProject = (action$: ActionsObservable<any>) => {
    return action$.ofType(ProjectActions.UPDATE_PROJECT) // Listen for this action
      .mergeMap(({ payload }) => { 
        return this.projectService.updateProject(payload) // updateProject
            .map((result: any) => ({ // when web service responds with success, call this action with payload that came back from webservice
              type: ProjectActions.UPDATE_PROJECT_SUCCESS,
              payload: result
            }))
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: ProjectActions.UPDATE_PROJECT_FAILURE,
              payload: error
            }));
      });
  }

}