import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../entities/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() userInput: User;
  @Output() userClicked: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
  }

  onUserClick() {
    let obj = { user: this.userInput};
    this.userClicked.emit(obj);
  }
}
