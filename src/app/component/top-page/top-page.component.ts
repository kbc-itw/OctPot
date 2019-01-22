import {Component, OnInit} from '@angular/core';
import * as electron from 'electron';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  exit() {
    console.log(window);
    try {
      window.close();
    } catch (e) {
      console.log('desktopでないとsecurity上閉じれないです。');
      console.log(e);
    }
  }
}
