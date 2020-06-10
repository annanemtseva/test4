import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Tree} from '../app.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-knot',
  templateUrl: './knot.component.html',
  styleUrls: ['./knot.component.scss'],
  animations: [
    trigger('icon', [
      state('start', style({
        transform: 'rotate(0)'
      })),
      state('end', style({
        transform: 'rotate(90deg)'
      })),
      transition('start => end', animate(300)),
      transition('end => start', animate(300))
    ]),
    trigger('knot', [
      state('start', style({
        opacity: '0'
      })),
      state('end', style({
        opacity: '1'
      })),
      transition(':enter', [
        style({
          opacity: '0'
        }),
        animate(300)
      ]),
      transition(':leave', [
        style({
          opacity: '1'
        }),
        animate(300)
      ])
    ])
  ]
})
export class KnotComponent implements OnInit {
  @Input() knot: Tree;
  @Input() visibilityBranch: boolean;
  iconState = 'start';
  knotState = 'start';

  constructor() {
  }

  ngOnInit() {
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
    if (this.visibilityBranch) {
      this.iconState = 'start';
      this.knotState = 'start';
      this.visibilityBranch = false;
    } else {
      this.iconState = 'end';
      this.knotState = 'end';
      this.visibilityBranch = true;
    }
  }

}
