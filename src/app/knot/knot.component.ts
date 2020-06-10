import {Component, Input, OnInit} from '@angular/core';
import {Tree} from '../app.component';

@Component({
  selector: 'app-knot',
  templateUrl: './knot.component.html',
  styleUrls: ['./knot.component.scss']
})
export class KnotComponent implements OnInit {
  @Input()
  knot: Tree;

  constructor() { }

  ngOnInit() {
  }

}
