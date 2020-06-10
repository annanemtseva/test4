import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Tree {
  title: string;
  color: string;
  children: Tree [];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  tree: Tree;
  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.http.get('../assets/tree7.json').subscribe((data: Tree) => {
      this.tree = data;
      // console.log(data);
    }, (error) => {
      console.log('error fetch json: ', error.message);
    } );
  }

}
