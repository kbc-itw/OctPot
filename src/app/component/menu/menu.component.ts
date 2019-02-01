import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../Service/menu-service';
import {ChatRoomCreateComponent} from '../chat-room-create/chat-room-create.component';
import {ChatRoomComponent} from '../chat-room/chat-room.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  val;
  file: boolean = false;
  c_pass: boolean = false;
  view: boolean = false;
  pass;
  name;
  io;
  ip;
  userType;

  constructor(private menu: MenuService, private chatroom: ChatRoomCreateComponent, private chat: ChatRoomComponent) {
  }

  /*
  必要な情報
  部屋のパスワード
  それをここから操作するためのsocket
  peerも使うかも。
   */
  ngOnInit() {
    console.log('memo-component');
    // hostかクライアントかを判別するif文
    if (this.chatroom.getUserType()) {
      this.userType = this.chatroom;
    } else if (this.chat.getUserType()) {
      this.userType = this.chat;
    }
    this.ip = this.userType.ip;
    var params = this.userType.get_params();
    console.log(params[0]);
    this.pass = params[0].pass;
    this.name = params[0].name;
  }

  click(word) {
    this.menu.click(word);
  }

  change_pass() {
    console.log('change_pass');
    this.c_pass = false;
    var params = this.userType.get_params();
    console.log(params[0]);
    this.io = params[0].io;
    this.io.emit('change_pass', this.pass);
  }

  sendFile() {
    // file送信
    console.log('----------------------sedFile-------------------------');
  }

  leave() {
    this.userType.leave();
  }
}
