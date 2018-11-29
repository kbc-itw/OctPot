import { Component, OnInit } from '@angular/core';
import {ChatRoomService} from '../../Service/chat-room-service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './test.html'
})
export class ChatRoomComponent implements OnInit {
  constructor(private chat: ChatRoomService) { }
  ngOnInit() {
    console.log('chat-room-component');
  }
  connect() {
    console.profile('connectFunction');
    this.chat.connect();
    console.profileEnd();
  }
  offer() {
    console.profile('offerFunction');
    this.chat.offer();
    console.profileEnd();
  }
}
