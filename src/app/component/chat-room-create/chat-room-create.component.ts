import {Component, OnInit} from '@angular/core';
import {ChatRoomCreateService} from '../../Service/chat-room-create.service';

@Component({
  selector: 'app-chat-room-create',
  templateUrl: './chat-room-create.component.html'
})
export class ChatRoomCreateComponent implements OnInit {
  pass;
  comment;
  ip;
  bool: boolean = false;
  message_list: any= [];
  constructor(private chatroom: ChatRoomCreateService ) {
  }

  ngOnInit() {
    this.chatroom.getio().on('IP', (e) => {
      console.log('IPdayo', e);
      this.ip = e;
    });
    this.chatroom.data.subscribe(message => {
      this.message_list.push(message);
    });
  }

  create() {
    console.groupCollapsed('createFunction(component)');
    console.log(this.pass);
    this.bool = true;
    if (this.bool) {
      console.profile('createFunction(service)');
      this.chatroom.create(this.pass);
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
