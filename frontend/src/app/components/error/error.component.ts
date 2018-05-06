import { Component, OnInit } from '@angular/core';
import { Auth1Service } from '../../services/auth1.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorMessage: String = "";
  hideBtn = false;

  constructor(private authService: Auth1Service) { }

  ngOnInit() {
    this.authService.currentErrorMessage.subscribe(errorMessage => this.errorMessage = errorMessage);
    if (this.errorMessage === "You don't have Admin privileges !!!"){
      this.hideBtn = true;
    }
  }

}
