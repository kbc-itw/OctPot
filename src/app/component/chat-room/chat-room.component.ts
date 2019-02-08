import {Component, OnInit} from '@angular/core';
import {ChatRoomService} from '../../Service/chat-room-service';
import {DiceService} from '../../Service/dice-service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']

})
export class ChatRoomComponent implements OnInit {
  rooms;
  message_list: any;
  room_in: boolean;
  comment;
  ip;
  pass;
  name;
  userType = false;

  constructor(private chat: ChatRoomService, private dice: DiceService) {
  }

  ngOnInit() {
    console.log('chat-room-component');
    this.userType = true;
    this.message_list = [];
    this.room_in = false;
    this.chat.preparation();
    this.chat.get_io().on('hello', (e) => {
      console.log('hello ------------------------------------------------------------------------------------------', e);
      this.room_in = true;
      // this.message_list.push(e);
    });
    this.chat.get_io().on('key_default', () => {
      console.log('パスワードが違います。');
    });
    this.chat.data.subscribe(message => {
      var date = '(' + moment().format('YY/MM/DD HH:mm') + ')';
      if (message !== null && message !== undefined && message !== '') {
        this.message_list.push({message: message, date: date});
      }
    });
  }

  connect() {
    console.profile('connectFunction');
    this.chat.connect();
    console.profileEnd();
  }

  enter() {
    console.log('enter: ', this.ip);
    if (this.name === '' || this.name === null || this.name === undefined) {
      this.name = '名無しさん';
    }
    if (this.pass === '' || this.pass === null || this.pass === undefined) {
      this.pass = '';
    }
    this.chat.enter(this.ip, this.pass, this.name);
  }

  offer() {
    console.profile('offerFunction');
    this.chat.offer();
    console.profileEnd();
  }

  message() {
    if (this.comment !== null && this.comment !== undefined && this.comment !== '') {
      var result = this.dice.roll(this.comment);
      if (result[1] !== undefined) {
        this.chat.message(result[2] + result[3] + result[1]);
      } else {
        this.chat.message(this.comment);
      }
    }
    this.comment = null;
  }

  getUserType() {
    console.log('getUserType');
    return this.userType;
  }

  get_params() {
    console.log('get_params');
    var params = [];
    params.push({
      io: this.chat.get_io(), member: null,
      pass: null, name: this.chat.get_name()
    });
    console.log(params);
    return params;
  }

  get_channel() {
    return this.chat.get_channel();
  }

  leave() {
    this.chat.leave();
    this.comment = null;
    this.ip = null;
    this.pass = null;
    this.name = null;
    this.message_list = [];
    this.userType = false;
  }
}
