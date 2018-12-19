import { Injectable } from '@angular/core';
import * as client from 'socket.io-client';

import { Memo } from '../model/Memo';

@Injectable()
export class MemoService {
  private io;
  private room;
  private name;

  constructor() {
    this.room = 'testroom';
    this.name = 'testname';

    this.io = client.connect('http://localhost:8080');

    console.log(this.io + 'connecting...');
    this.io.on('connect', function(evt) {
      enter(this.room, this.name)
      console.log('enter to ' + this.room );

    });

    function enter(room, name) {
      this.io.on('connected', function() {
        this.io.json.emit('enter', { 'room': this.room, 'name': this.name });
      });

      this.io.on('send', function(data) {
        console.log('send' + data );

        if (data) {

          update(data);
        }
      });
    }

    function update(data){
      if(data.action){

      }
    }
  }

  send(memo: Memo){
    console.log(memo.user);
    this.io.emit('send', memo );
  }
}
