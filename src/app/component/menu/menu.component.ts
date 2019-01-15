import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../Service/menu-service';
import { ChatRoomCreateComponent } from '../chat-room-create/chat-room-create.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  val;
  constructor(private menu: MenuService, private chatroom: ChatRoomCreateComponent) { }
  ngOnInit() {
    console.log('memo-component');
  }
  click(word) {
    this.menu.click(word);
  }
  leave() {
    this.chatroom.leave();
  }
}
