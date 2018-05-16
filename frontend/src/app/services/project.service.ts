import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Project } from "./../entities/project";


@Injectable()
export class ProjectService {
  dbServerURL:string = "http://localhost:3001/";

  constructor(private http: HttpClient) {
  }
  
  updateProject(project: Project) {
    return this.http.post(this.dbServerURL + "update-project/", project);
  }

  deleteProject(id: string) {
    return this.http.post(this.dbServerURL + "delete-project/", id);
  }

  addProject(project: Project) {
    return this.http.post(this.dbServerURL + "add-project/", project);
  }

  getProjects() {
    return this.http.get(this.dbServerURL + "get-projects");
  }
}
