import {Component, OnInit, Renderer2} from '@angular/core';
import {MenuService} from '../../Service/menu-service';
import {ChatRoomCreateComponent} from '../chat-room-create/chat-room-create.component';
import {ChatRoomComponent} from '../chat-room/chat-room.component';
import {CharacterDataListService} from '../../Service/character-data-list.service';
import { CharacterManagementService } from '../../Service/character-management.service';
import { CharacterSelectedService} from '../../Service/character-selected.service';

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
  PC;
  NPC;
  current;

  constructor(private menu: MenuService, private chatroom: ChatRoomCreateComponent,
              private chat: ChatRoomComponent, private cdl: CharacterDataListService,
              private management: CharacterManagementService, private characterSelected: CharacterSelectedService,
              private renderer: Renderer2) {
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

    this.PC = this.management.getItem('PC');
    this.NPC = this.management.getItem('NPC');
    
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
      try {
        var fr = new FileReader();
        fr.onload = () => {
          // 読み込み完了時に送信
          console.log(typeof fr.result);
          this.cdl.onNotifyShareDataChanged(fr.result);
          this.userType.get_member().forEach((e) => {
            console.log('--------------------------------------------------------------------', e);
            e.f_channel.send(fr.result);
          });
        };
        fr.readAsText(file[0]);
        // this.member[this.member.length - 1].channel.send(value);
      } catch (e) {
        console.log('message: ');
        console.log(e);
      }
    } else if (this.chat.getUserType()) {
      console.log('client');
      // clientの場合
      var file_channel = this.userType.get_file_channel();
      try {
        console.log(file[0]);
        console.log(file[0].name);
        console.log(file[0].path);
        console.log(file);
        console.log(file[0]);
        var fr = new FileReader();

        console.log();
        fr.onload = () => {
          // 読み込み完了時に送信
          console.log(typeof fr.result);
          console.log(fr.result);
          file_channel.send(fr.result);
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

  // キャラJSONを参加者に送信します
  // json: キャラJSON ※string型で引数に入れること(元がJSONならばJSON.stringify()してね)
  fileSharering(charaJson: string) {
    console.log(charaJson);
    if (this.chatroom.getUserType()) {
      // もしhostだったらmember全員にfile送信
      try {
        this.cdl.onNotifyShareDataChanged(charaJson);
        this.userType.get_member().forEach((e) => {
          e.f_channel.send(charaJson);
        });
        // this.member[this.member.length - 1].channel.send(value);
      } catch (e) {
        console.log('message: ');
        console.log(e);
      }
    } else if (this.chat.getUserType()) {
      // clientの場合
      var file_channel = this.userType.get_file_channel();
      try {
          file_channel.send(charaJson);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('other');
    }
  }

  leave() {
    this.userType.leave();
  }

  // キャラクターを選択したら発火します。
  // 選択したキャラクターを他プレイヤーに送信します。
  // type: PC or NPC, index: ローカルストレージでの位置, charaName: キャラクターの名前
  charaSelect(type, index, charaName) {
    let res = confirm(charaName + ' を他プレイヤーに送信しますか？');
    if ( res === true ) {
      this.characterSelected.selectedIndex = index;
      this.characterSelected.selectedType = type;
      let selectedChara = this.management.getOneItem(this.characterSelected.selectedType, this.characterSelected.selectedIndex);
      this.fileSharering(JSON.stringify(selectedChara));
    }
  }
}
