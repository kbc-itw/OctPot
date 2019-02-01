import {Component, OnInit} from '@angular/core';
import {ChatRoomCreateService} from '../../Service/chat-room-create.service';
import {DiceService} from '../../Service/dice-service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-room-create',
  templateUrl: './chat-room-create.component.html',
  styleUrls: ['../chat-room/chat-room.component.css']
})
export class ChatRoomCreateComponent implements OnInit {
  pass;
  name;
  comment;
  ip;
  bool: boolean = false;
  message_list: any = [];
  userType = false;

  constructor(private chatroom: ChatRoomCreateService, private dice: DiceService) {
    this.userType = true;
  }

  ngOnInit() {
    this.chatroom.io_connect();
    this.chatroom.get_io().on('IP', (e) => {
      console.log('IPdayo', e);
      this.ip = e;
    });
    this.chatroom.data.subscribe(message => {
      var date = '(' + moment().format('YY/MM/DD HH:mm') + ')';
      if (message !== null && message !== undefined && message !== '') {
        this.message_list.push({message: message, date: date});
      }
      setTimeout(() => {
        this.scrollHeight();
      }, 0.0001);
    });
  }

  create() {
    console.groupCollapsed('createFunction(component)');
    console.log(this.pass);
    this.bool = true;
    if (this.bool) {
      console.profile('createFunction(service)');
      if (this.name === '' || this.name === null || this.name === undefined) {
        this.name = '名無しさん';
      }
      if (this.pass === '' || this.pass === null || this.pass === undefined) {
        this.pass = '';
      }
      this.chatroom.create(this.pass, this.name);
      console.profileEnd();
    }
    console.groupEnd();
  }

  message() {
    console.log(this.comment);
    if (this.comment !== null && this.comment !== undefined && this.comment !== '') {
      var result = this.dice.roll(this.comment);
      if (result[1] !== undefined) {
        if (result[4] !== true) {
          // sercretdice出ない場合
          this.chatroom.message(result[2] + result[3] + result[1]);
        } else if (result[4] === true) {
          // sercretdice
          this.chatroom.message(result[2] + result[3] + result[1], true);
        }
      } else {
        this.chatroom.message(this.comment);
      }
    }
    this.comment = null;
  }

  scrollHeight() {
    // チャット時にチャットスクロールの一番下に移動
    console.log('scroll');
    let scr: any = document.getElementsByClassName('log');
    try {
      console.log(scr[0].scrollHeight);
      console.log(scr[0].scrollTop);
      scr[0].scrollTop = scr[0].scrollHeight;
    } catch (e) {
      console.log(e);
    }
  }

  get_params() {
    console.log('get_params');
    var params = [];
    params.push({
      io: this.chatroom.get_io(), member: this.chatroom.get_member(),
      pass: this.chatroom.get_pass(), name: this.chatroom.get_name()
    });
    console.log(params);
    return params;
  }

  getUserType() {
    console.log('getUserType');
    return this.userType;
  }

  leave() {
    this.chatroom.leave();
    this.pass = null;
    this.name = null;
    this.comment = null;
    this.ip = null;
    this.bool = false;
    this.message_list = [];
    this.userType = false;
  }
}
