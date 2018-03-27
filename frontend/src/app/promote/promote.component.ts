import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations'


@Component({
  selector: 'app-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})
export class PromoteComponent implements OnInit {
  show = false;

  constructor() { }

  get stateName() {
    return this.show ? 'show' : 'hide'
  }

  ngOnInit() {
    setTimeout(() => this.show = true, 1000);
  }
}
