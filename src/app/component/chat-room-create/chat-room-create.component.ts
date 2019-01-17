import {Component, OnInit} from '@angular/core';
import {ChatRoomCreateService} from '../../Service/chat-room-create.service';
import {DiceService} from '../../Service/dice-service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-room-create',
  templateUrl: './chat-room-create.component.html',
  styleUrls: ['../chat-room/chat-room.component.css']
})
export class ChatRoomCreateComponent implements OnInit {
  pass;
  name;
  comment;
  ip;
  bool: boolean = false;
  message_list: any= [];
  constructor(private chatroom: ChatRoomCreateService, private dice: DiceService) {
  }

  ngOnInit() {
    this.chatroom.io_connect();
    this.chatroom.get_io().on('IP', (e) => {
      console.log('IPdayo', e);
      this.ip = e;
    });
    this.chatroom.data.subscribe(message => {
      var date = '(' + moment().format('YY/MM/DD HH:mm') + ')';
      if (message !== null && message !== undefined && message !== '') {
        this.message_list.push({message: message, date: date});
      }
    });
  }

  create() {
    console.groupCollapsed('createFunction(component)');
    console.log(this.pass);
    this.bool = true;
    if (this.bool) {
      console.profile('createFunction(service)');
      if (this.name === '' || this.name === null || this.name === undefined) {
        this.name = '名無しさん';
      }
      if (this.pass === '' || this.pass === null || this.pass === undefined) {
        this.pass = '';
      }
      this.chatroom.create(this.pass, this.name);
      console.profileEnd();
    }
    console.groupEnd();
  }

  message() {
    console.log(this.comment);
    if (this.comment !== null && this.comment !== undefined && this.comment !== '') {
      var result = this.dice.roll(this.comment);
      if (result !== undefined) {
        this.chatroom.message(this.comment + ' => ' + result);
      } else {
        this.chatroom.message(this.comment);
      }
    }
    this.comment = null;
  }

  get_params() {
    console.log('get_params');
    var params = [];
    params.push({io: this.chatroom.get_io(), member: this.chatroom.get_member(),
      pass: this.chatroom.get_pass(), name: this.chatroom.get_name()});
    console.log(params);
    return params;
  }
  leave() {
    this.chatroom.leave();
    this.pass = null;
    this.name = null;
    this.comment = null;
    this.ip = null;
    this.bool = false;
    this.message_list = [];
  }
}
