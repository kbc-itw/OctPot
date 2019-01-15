import { Component, OnInit } from '@angular/core';
import { TopRoomService } from '../../Service/top-room-service';

@Component({
  selector: 'app-top-room',
  templateUrl: './top-room.component.html',
  styleUrls: ['./top-room.component.css']
})
export class TopRoomComponent implements OnInit {
  menu;
  constructor(private top: TopRoomService) { }
  ngOnInit() {
    console.log('top-room-component');
  }
  click(word) {
    this.top.click(word);
  }
}
