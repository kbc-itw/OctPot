import {Component, OnInit} from '@angular/core';
import { Memo } from './memo';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss']
})


export class MemoComponent implements OnInit {

  /*
  selected: Memo;

  memos = [{
    id: 1,
  value: 'hoge'
  }];

  onclick(memo: Memo) {
    this.selected = {
      value: memo.value ,
    }
  }
  */

  add() {
    console.log('add');
    window.open(',/', 'newwindow', 'width=400,height=300');
  }

  delete() {
    console.log('delete');
    window.open('about:blank', '_self').close();
  }

    ngOnInit() {
      console.log('OnInit');
    }


}





