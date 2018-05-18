import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FileuploadService {
  dbServerURL:string = "http://localhost:3001/";
  selectedFile: File;


  constructor(private http: HttpClient) { }

  uploadFile(): Observable<ServerResponce>{
    
    const fd = new FormData();

    fd.append("image", this.selectedFile, this.selectedFile.name)

    return this.http.post<ServerResponce>(this.dbServerURL + "upload-file/", fd);
    
  }
}

interface ServerResponce{
  status: number,
  message: string
}
