import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../Service/menu-service';

@Component({
  selector: 'app-top-room',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu;
  constructor(private top: MenuService) { }
  ngOnInit() {
    console.log('top-room-component');
  }
  click(word) {
    this.top.click(word);
  }
}
