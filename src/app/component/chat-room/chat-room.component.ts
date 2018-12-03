import { Component, OnInit } from '@angular/core';
import {ChatRoomService} from '../../Service/chat-room-service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './test.html'
})
export class ChatRoomComponent implements OnInit {
  private rooms;
  private message_list: any= [];
  private room_in: boolean = false;
  constructor(private chat: ChatRoomService) {
    this.chat.getio().on('rooms', (e) => {
      console.log('ルーム名');
      console.log(e);
      this.rooms = e.room;
      this.showRoom();
    });
    this.chat.getio().on('hello', (e) => {
      console.log('hello ', e);
      this.room_in = true;
      this.message_list.push(e);
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
  enter(e) {
    console.log('enter: ', e);
    this.chat.enter(e);
  }
  offer() {
    console.profile('offerFunction');
    this.chat.offer();
    console.profileEnd();
  }
}
