import {Component, OnInit, ElementRef, ViewChild, Renderer2} from '@angular/core';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss']
})


export class MemoComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
  ) { }

  // @ts-ignore
  @ViewChild('memos') memor: ElementRef;
  private num = 2;
  private latest = '';


  add() {

    let memoclass = document.getElementsByClassName('memo') as HTMLCollectionOf<HTMLElement>;
    this.num += 1;
    let textarea = this.renderer.createElement('textarea');
    this.renderer.addClass(textarea, 'memo');
    textarea.id = 'memo' + this.num ;
    this.renderer.appendChild(this.memor.nativeElement, textarea);
  }

  del() {
    let del = document.getElementById(this.latest);

    console.log('delete');
    if (this.latest === '' ) {
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

    if ( current.className === 'memo') {
      this.latest = current.id;
    }
    console.log(this.latest);
  }

  ngOnInit() {
    console.log('OnInit');
  }

}
