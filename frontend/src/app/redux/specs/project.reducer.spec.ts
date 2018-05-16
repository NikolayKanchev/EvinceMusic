var deepFreeze = require('deep-freeze');
import { projectReducer } from './../reducers/project.reducer';
import * as types from './../actions/project.actions';

describe('project reducer', () => {
 
  it('should return the initial state', () => {
      expect(projectReducer(undefined, {})).toEqual({ projects: []});
  });

  it('Should add a new project object to array of projects', () => {
    let state = { projects: []};
    deepFreeze(state);
    let dateString = Date.now.toString;

    let newProject = { 
      id: "1",
      pick: "comming soon",
      title: "The best project",
      date: this.dateString,
      text: "HHHHHHHHHHHHHHHHH HHHHHHHHHHHH HHHHHHHHHHHHHH "
     };

    expect( projectReducer(state, { 
      type: types.ProjectActions.ADD_PROJECT, 
      payload: newProject
    })).toEqual({ projects: 
      [{  
      id: "1",
      pick: "comming soon",
      title: "The best project",
      date: this.dateString,
      text: "HHHHHHHHHHHHHHHHH HHHHHHHHHHHH HHHHHHHHHHHHHH " 
      }]
    });
  });
});
