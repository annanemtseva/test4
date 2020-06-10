import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpService} from './http.service';
import {animate, state, style, transition, trigger} from '@angular/animations';


export interface Tree {
  title: string;
  color: string;
  children: Tree [];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openingCategories', [
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
    ])]
})

export class AppComponent implements OnInit {
  tree: Tree;
  visibility = false;
  isOpen = false;
  openingCategories = 'start';


  constructor(
    private httpService: HttpService,
    private el: ElementRef
  ) {
  }

  ngOnInit() {
    this.httpService.getData().subscribe((data: Tree) => {
      this.tree = data;
    }, (error) => {
      console.log('Error fetch json: ', error.message);
    });
  }

  openCategories() {
    this.isOpen = !this.isOpen;
    this.openingCategories = 'end';
  }
}
