import { Component, OnInit } from '@angular/core';
import { Auth1Service } from '../auth1.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorMessage: String = "";

  constructor(private authService: Auth1Service) { }

  ngOnInit() {
    this.authService.currentErrorMessage.subscribe(errorMessage => this.errorMessage = errorMessage);
  }

}
