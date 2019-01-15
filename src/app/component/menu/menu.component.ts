import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../Service/menu-service';
import { ChatRoomCreateComponent } from '../chat-room-create/chat-room-create.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  val;
  c_pass: boolean = false;
  pass;
  constructor(private menu: MenuService, private chatroom: ChatRoomCreateComponent) { }
  /*
  必要な情報
  部屋のパスワード
  それをここから操作するためのsocket
  peerも使うかも。
   */
  ngOnInit() {
    console.log('memo-component');
  }
  click(word) {
    this.menu.click(word);
  }
  change_pass() {
    console.log('change_pass');
    this.c_pass = false;
  }
  get_params() {
    console.log('get_params');
    var params = this.chatroom.get_params();
    console.log(params);
  }
  leave() {
    this.chatroom.leave();
  }
}
