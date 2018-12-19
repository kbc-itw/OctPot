import { Component, OnInit } from '@angular/core';
import {ChatRoomService} from '../../Service/chat-room-service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './test.html'
})
export class ChatRoomComponent implements OnInit {
  rooms;
  message_list: any= [];
  room_in: boolean = false;
  comment;
  ip;
  pass;
  constructor(private chat: ChatRoomService) {
    this.chat.getio().on('hello', (e) => {
      console.log('hello ', e);
      this.room_in = true;
      // this.message_list.push(e);
    });
  }
  ngOnInit() {
    console.log('chat-room-component');
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
    this.chat.message(this.comment);
    this.comment = undefined;
  }
}
