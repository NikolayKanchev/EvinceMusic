import { ProjectActions } from './../actions/project.actions';
import { ProjectsState } from './../store/store';
import { tassign } from 'tassign';

const INITIAL_STATE: ProjectsState = {projects: []}

export function projectReducer(state: ProjectsState = INITIAL_STATE, action:any) {
 
  switch (action.type) {

    case ProjectActions.GET_PROJECTS: // The component wants the data
      return state;

    case ProjectActions.GET_PROJECTS_SUCCESS: // The ws sent back the projects.
      return tassign(state, {projects: action.payload});
      
    case ProjectActions.GET_PROJECTS_FAILURE: // The ws failed or something else bad
      return state;

    case ProjectActions.ADD_PROJECT: // The component wants the data
    return tassign(state, {projects: [...state.projects, action.payload]});
    // return state;

    case ProjectActions.ADD_PROJECT_SUCCESS:
      return state;

    case ProjectActions.ADD_PROJECT_FAILURE: // The ws failed or something else bad
    return state;

    case ProjectActions.DELETE_PROJECT: // The component wants the data
    return state;

    case ProjectActions.DELETE_PROJECT_SUCCESS:
    return tassign(state, {projects: [...state.projects, action.payload]});

    case ProjectActions.DELETE_PROJECT_FAILURE: // The ws failed or something else bad
    return state;

    case ProjectActions.UPDATE_PROJECT: // The component wants the data
    return state;

    case ProjectActions.UPDATE_PROJECT_SUCCESS:
    return tassign(state, {projects: [...state.projects, action.payload]});

    case ProjectActions.UPDATE_PROJECT_FAILURE: // The ws failed or something else bad
    return state;
 
    default:
     return state;
 }
}
