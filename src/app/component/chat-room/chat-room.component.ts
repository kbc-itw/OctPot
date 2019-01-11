import { Component, OnInit } from '@angular/core';
import {ChatRoomService} from '../../Service/chat-room-service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-room',
  templateUrl: './test.html'
})
export class ChatRoomComponent implements OnInit {
  rooms;
  message_list: any;
  room_in: boolean;
  comment;
  ip;
  pass;
  name;
  constructor(private chat: ChatRoomService) {}
  ngOnInit() {
    console.log('chat-room-component');
    this.message_list = [];
    this.room_in = false;
    this.chat.preparation();
    this.chat.getio().on('hello', (e) => {
      console.log('hello ------------------------------------------------------------------------------------------', e);
      this.room_in = true;
      // this.message_list.push(e);
    });
    this.chat.getio().on('key_default', () => {
      console.log('パスワードが違います。');
    });
    this.chat.data.subscribe(message => {
      var date = '(' + moment().format('YY/MM/DD HH:mm') + ')';
      if (message !== null && message !== undefined && message !== '') {
        this.message_list.push({message: message, date: date});
      }
    });
  }
  connect() {
    console.profile('connectFunction');
    this.chat.connect();
    console.profileEnd();
  }
  enter() {
    console.log('enter: ', this.ip);
    if (this.name === '' || this.name === null || this.name === undefined) {
      this.name = '名無しさん';
    }
    if (this.pass === '' || this.pass === null || this.pass === undefined) {
      this.pass = '';
    }
    this.chat.enter(this.ip, this.pass, this.name);
  }
  offer() {
    console.profile('offerFunction');
    this.chat.offer();
    console.profileEnd();
  }
  message() {
    if (this.comment !== null && this.comment !== undefined && this.comment !== '') {
      this.chat.message(this.comment);
    }
    this.comment = null;
  }
  leave() {
    this.chat.leave();
    this.comment = null;
    this.ip = null;
    this.pass = null;
    this.name = null;
  }
}
