import { Component, OnInit } from '@angular/core';
import {ChatRoomService} from './chat-room-service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './test.html'
})
export class ChatRoomComponent implements OnInit {
  constructor(private chatroom: ChatRoomService) { }
  ngOnInit() {
    console.log('kkkk');
  }
}
