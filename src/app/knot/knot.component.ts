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
  @Input() parent: Tree;
  iconState = 'start';
  knotState = 'start';

  constructor() {
  }

  ngOnInit() {
  }

  toggleChildrenVisibility() {
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

  addChildren(event: Event) {
    const children = this.knot.children;
    const isEmptyElemPresent = children.find((select: Tree) => {
      return select.title.length === 0;
    });
    if (!isEmptyElemPresent) {
      const isEmpty = children.length === 0;
      children.push({title: '', color: '#000000', children: []});
      if (isEmpty) {
        this.toggleChildrenVisibility();
      }
    }

    event.stopPropagation();
  }

  removeChildren(event: Event) {
    this.parent.children.splice(this.parent.children.findIndex((select: Tree) => {
      return select.title === this.knot.title;
    }), 1);
    event.stopPropagation();
  }

  addTitle(event: Event) {
    this.knot.title = event.target.value;
    console.log(this.knot.title);
  }
}
