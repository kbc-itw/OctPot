import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { MemoService } from '../../Service/memo.service';

import {User} from '../../model/User';
import {Memo} from '../../model/Memo';
import {Action} from '../../model/Action';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
  providers: [MemoService]

})


export class MemoComponent implements OnInit {

  user: User;
  memo: { user: User; value: string; action: Action };
  action: Action;

  constructor(
    private renderer: Renderer2,
    private service: MemoService
  ) {
  }


  // @ts-ignore
  @ViewChild('memos') memor: ElementRef;
  private num = 2;
  private latest = '';


  add() {

    let memoclass = document.getElementsByClassName('memo') as HTMLCollectionOf<HTMLElement>;
    this.num += 1;
    let textarea = this.renderer.createElement('textarea');
    this.renderer.addClass(textarea, 'memo');
    textarea.id = 'memo' + this.num;
    this.renderer.appendChild(this.memor.nativeElement, textarea);

    this.action = Action.ADD;
    this.memo = { user: this.user, value: 'aho' ,action: this.action };

    this.service.send(this.memo);
  }

  del() {
    let del = document.getElementById(this.latest);

    console.log('delete');
    if (this.latest === '') {
      window.alert('削除したいメモを選択してください。');
    } else if (window.confirm('以下のメモを削除します。\n ')) {
      del.remove();
      this.latest = '';
    } else {
      window.alert('きゃんせる！');
      this.latest = '';
    }
  }

  sel() {
    let current = document.activeElement;

    if (current.className === 'memo') {
      this.latest = current.id;
    }
    console.log(this.latest);
  }

  ngOnInit() {
    console.log('OnInit');
    this.user = {
      id: 1,
      name: `test`
    };
  }


}
