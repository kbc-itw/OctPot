import { Component, OnInit } from '@angular/core';
import {ChatRoomCreateService} from './chat-room-create.service';

@Component({
  selector: 'app-chat-room-create',
  templateUrl: './chat-room-create.component.html'
})
export class ChatRoomCreateComponent implements OnInit {
  room;
  pass;
  constructor(private chatroom: ChatRoomCreateService ) { }

  ngOnInit() {
  }

  create() {
    console.log(this.room);
    console.log(this.pass);
  }
}
