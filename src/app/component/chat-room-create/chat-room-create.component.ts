import {Component, OnInit} from '@angular/core';
import {ChatRoomCreateService} from '../../Service/chat-room-create.service';

@Component({
  selector: 'app-chat-room-create',
  templateUrl: './chat-room-create.component.html'
})
export class ChatRoomCreateComponent implements OnInit {
  room;
  pass;
  comment;
  bool: boolean = false;
  private message_list: any= [];
  constructor(private chatroom: ChatRoomCreateService ) {
  }

  ngOnInit() {
    this.chatroom.data.subscribe(message => {
      this.message_list.push(message);
    });
  }

  create() {
    console.groupCollapsed('createFunction(component)');
    console.log(this.room);
    console.log(this.pass);
    if (this.room !== undefined && this.room !== null) {
      this.bool = true;
    }else {
    }
    if (this.bool) {
      console.profile('createFunction(service)');
      this.chatroom.create(this.room, this.pass);
      console.profileEnd();
    }
    console.groupEnd();
  }

  message() {
    console.log(this.comment);
    this.chatroom.message(this.comment);
    this.comment = undefined;
  }
}
