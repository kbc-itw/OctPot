import { Component, OnInit } from '@angular/core';
import {ChatRoomService} from './chat-room-service';

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
    // 現状ioのイベントconnectが発火されない。おそらくconstructorで先につないでるから？
    this.chat.connect();
  }
}
