import { Component, OnInit } from '@angular/core';
import {ChatRoomService} from '../../Service/chat-room-service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './test.html'
})
export class ChatRoomComponent implements OnInit {
  private rooms;
  constructor(private chat: ChatRoomService) {
    this.chat.io.on('rooms', (e) => {
      console.log('ルーム名');
      console.log(e);
      this.rooms = e.room;
      /*
      e.room.forEach(function (value) {
        console.log(value);
      });
      */
      this.showRoom();
    });
  }
  ngOnInit() {
    console.log('chat-room-component');
  }
  showRoom() {
    console.log(this.rooms);
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
