import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { projectReducer } from './../project.reducer';
import { Project } from '../entities/project';

export class ProjectsState {
 projects: Project[];
}

export class IAppState {
 projects?: ProjectsState;
}

export const rootReducer = combineReducers<IAppState>({
 projects: projectReducer,

 router: routerReducer
});
