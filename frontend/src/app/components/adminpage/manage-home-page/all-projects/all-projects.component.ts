import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../../redux/store/store';
import { ProjectActions } from '../../../../redux/actions/project.actions';
import { Project } from '../../../../entities/project';
import { MatTableDataSource } from '@angular/material';
import { FileuploadService } from '../../../../services/fileupload.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {
  private projects: Project[];
  displayedColumns = ['pick', 'title', 'date', 'delete'];
  dataSource = new MatTableDataSource();

  constructor(private ngRedux: NgRedux<IAppState>,
    private projectActions: ProjectActions, private fileUploadService: FileuploadService) { }

  ngOnInit() {
    this.projectActions.getProjects();
    
    this.ngRedux.select(state => state.projects).subscribe(res => { 
      this.projects = res.projects;  
      this.dataSource.data = res.projects;
      console.log(this.projects);
    });
  }

  onDelete(project: Project) {
    this.projectActions.deleteProject(project.id);

    this.fileUploadService.deleteFile(project.pick).subscribe(data =>{
      console.log(data);
    });
  }
}
