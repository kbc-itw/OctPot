import {Component, OnInit} from '@angular/core';
import {ChatRoomCreateService} from '../../Service/chat-room-create.service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-room-create',
  templateUrl: './chat-room-create.component.html'
})
export class ChatRoomCreateComponent implements OnInit {
  pass;
  name;
  comment;
  ip;
  bool: boolean = false;
  message_list: any= [];
  constructor(private chatroom: ChatRoomCreateService ) {
  }

  ngOnInit() {
    this.chatroom.io_connect();
    this.chatroom.getio().on('IP', (e) => {
      console.log('IPdayo', e);
      this.ip = e;
    });
    this.chatroom.data.subscribe(message => {
      var date = '(' + moment().format('YY/MM/DD HH:mm') + ')';
      if (message !== null && message !== undefined && message !== '') {
        this.message_list.push({message: message, date: date});
      }
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
      this.chatroom.message(this.comment);
    }
    this.comment = null;
  }

  leave() {
    this.chatroom.leave();
    this.pass = null;
    this.name = null;
    this.comment = null;
    this.ip = null;
    this.bool = false;
    this.message_list = [];
  }
}
