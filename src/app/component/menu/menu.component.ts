import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../Service/menu-service';
import {ChatRoomCreateComponent} from '../chat-room-create/chat-room-create.component';
import {ChatRoomComponent} from '../chat-room/chat-room.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  val;
  file: boolean = false;
  c_pass: boolean = false;
  view: boolean = false;
  pass;
  name;
  io;
  ip;
  userType;

  constructor(private menu: MenuService, private chatroom: ChatRoomCreateComponent, private chat: ChatRoomComponent) {
  }

  /*
  必要な情報
  部屋のパスワード
  それをここから操作するためのsocket
  peerも使うかも。
   */
  ngOnInit() {
    console.log('memo-component');
    // hostかクライアントかを判別するif文
    console.log(this.chat.getUserType());
    console.log(this.chatroom.getUserType());
    if (this.chatroom.getUserType()) {
      this.userType = this.chatroom;
    } else if (this.chat.getUserType()) {
      this.userType = this.chat;
    }
    console.log('userType:  ', this.userType);
    this.ip = this.userType.ip;
    var params = this.userType.get_params();
    console.log(params[0]);
    this.pass = params[0].pass;
    this.name = params[0].name;
  }

  click(word) {
    this.menu.click(word);
  }

  change_pass() {
    console.log('change_pass');
    this.c_pass = false;
    var params = this.userType.get_params();
    console.log(params[0]);
    this.io = params[0].io;
    this.io.emit('change_pass', this.pass);
  }

  sendFile(file) {
    // file送信
    console.log('----------------------sedFile-------------------------');
    console.log(file);
    console.log(file[0]);
    console.log(this.userType);
    console.log(this.chatroom.getUserType());
    console.log(this.chat.getUserType());
    if (this.chatroom.getUserType()) {
      console.log('host');
      // もしhostだったらmember全員にfile送信
      var value = this.name + ': ' + file;
      try {
        this.userType.get_member().forEach((e) => {
          console.log('--------------------------------------------------------------------', e);
          e.channel.send(value);
        });
        // this.member[this.member.length - 1].channel.send(value);
      } catch (e) {
        console.log('message: ');
        console.log(e);
      }
    } else if (this.chat.getUserType()) {
      console.log('client');
      // clientの場合
      var channel = this.userType.get_channel();
      var value = this.name + ': ' + file;
      console.log(value);
      try {
        console.log(file[0]);
        console.log(file[0].name);
        console.log(file[0].path);
        // var file2: any = new File(file, 'tessss.json');
        // console.log(file2);
        /*
        var fr = new FileReader();
        fr.onload = () => {
          // 読み込み完了時に送信
          if (channel !== undefined) {// もしhostとの接続が切れていなかったら
            console.log(fr.result);
            console.log(fr.result.toString());
            var b_file: any = Buffer.from(fr.result.toString());
            console.log(b_file);
            var array_file = new Uint8Array(b_file);
            console.log(array_file);
            channel.send(fr.result);
            channel.send(array_file);
            // channel.send(file);
          }
        };
        fr.readAsText(file[0]);
        */
        var fr = new FileReader();
        console.log(channel);
        console.log(channel.binaryType);
        console.log(channel);
        fr.onload = () => {
          // 読み込み完了時に送信
          console.log(fr.result);
          channel.send(fr.result);
          // channel.send(new Blob(file)); binarytypeは変えられないのか？
          // どうやってファイルとstringを見分けるか
          // もう一つchannelを作ってそっちでファイルを送信するか。
          // きりかえれない？
          // channelとpeerに1:1
          console.log(channel);
        };

        fr.readAsText(file[0]);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('other');
    }
    this.file = false;
  }

  leave() {
    this.userType.leave();
  }
}
