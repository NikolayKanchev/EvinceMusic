import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../redux/store/store';
import { ProjectActions } from '../../redux/actions/project.actions';
import { Project } from '../../entities/project';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private projects: Project[];

  constructor(private ngRedux: NgRedux<IAppState>,
    private projectActions: ProjectActions) { }

  ngOnInit() {
    this.projectActions.getProjects();

    this.ngRedux.select(state => state.projects).subscribe(res => { 
      this.projects = res.projects;  
    });
  }

  // onSelectFile(pickName: string) {

  //     let reader = new FileReader();

  //     reader.readyState("./../../../../../db-backend/uploads/party.jpg"); // read file as data url

  //     reader.onload = (event:any) => { // called once readAsDataURL is completed
  //         this.url = event.target.result;
      
  //   }
  // }

}
