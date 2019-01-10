import { Component, OnInit } from '@angular/core';
import {ChatRoomService} from '../../Service/chat-room-service';

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
    this.chat.data.subscribe(message => {
      this.message_list.push(message);
    });
  }
  connect() {
    console.profile('connectFunction');
    this.chat.connect();
    console.profileEnd();
  }
  enter() {
    console.log('enter: ', this.ip);
    this.chat.enter(this.ip);
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
  }
}
