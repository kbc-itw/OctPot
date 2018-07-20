import { Component, OnInit } from '@angular/core';
import {ChatRoomCreateService} from './chat-room-create.service';
@Component({
  selector: 'app-chat-room-create',
  templateUrl: './chat-room-create.component.html'
})
export class ChatRoomCreateComponent implements OnInit {

  constructor(private chatroom: ChatRoomCreateService ) { }

  ngOnInit() {

  }

  listen(e) {
  }
}
