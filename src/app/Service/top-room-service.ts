// ルームの最上位のcomponentのservice
import { Injectable } from '@angular/core';

@Injectable()
export class TopRoomService {
  constructor () {}
  click(word) {
    switch (word) {
      case 'file':
        console.log('file');
        break;
      case 'view':
        console.log('view');
        break;
      case 'koma':
        console.log('koma');
        break;
      case 'map':
        console.log('map');
        break;
      case 'config':
        console.log('config');
        break;
      case 'exit':
        console.log('exit');
        break;
      default:
        this.error_log('click', word);
    }
    console.log('file_click');
  }

  error_log(key, word = '') {
    console.log('error_log');
    switch (key) {
      case 'click':
        console.log('click is error');
        console.log('想定しないwordです。');
      default:
        console.log('想定しないerror');
    }
  }
}
