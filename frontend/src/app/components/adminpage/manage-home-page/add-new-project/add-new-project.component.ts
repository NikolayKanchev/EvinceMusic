import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FileuploadService } from '../../../../services/fileupload.service';
import { Project } from '../../../../entities/project';
import { ProjectActions } from '../../../../redux/actions/project.actions';


@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.scss']
})
export class AddNewProjectComponent implements OnInit {
  url: any;
  private addProjectForm: FormGroup;
  message: string;

  private project: Project = {
      id: null,
      pick: "",
      title: "",
      date: "no date",
      text: "",
    };


  constructor(private fb: FormBuilder, private router: Router, private fileUploadService:FileuploadService, private projectActions: ProjectActions) {}

  onSubmit(addProjectForm){

    if(addProjectForm.valid){
      this.fileUploadService.uploadFile().subscribe(
        data => {
          console.log(data);
  
          if(data.status === 200){
  
            this.message = data.message;
  
            setTimeout(() => {
              this.router.navigateByUrl("/adminpage/manage-home-page/all-projects"); 
            }, 3000);
          }
          addProjectForm.reset();
        })

        // Here I have to add the new picture
        this.project.pick = this.fileUploadService.selectedFile.name;
        this.project.title = addProjectForm.value.title;
        this.project.text = addProjectForm.value.text;

        this.projectActions.addProject(this.project);
      
        addProjectForm.reset();
      
    }else{
    }
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): any {
    this.addProjectForm = this.fb.group({
      title: ["", Validators.required],
      text: ["", Validators.required]
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {

      this.fileUploadService.selectedFile = <File>event.target.files[0];

      let reader = new FileReader();

      reader.readAsDataURL(this.fileUploadService.selectedFile); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
}
