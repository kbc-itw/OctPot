import { Component, OnInit } from '@angular/core';
import { TopRoomService } from '../../Service/top-room-service';

@Component({
  selector: 'app-top-room',
  templateUrl: './top-room.component.html'
})
export class TopRoomComponent implements OnInit {
  constructor(private top: TopRoomService) { }
  ngOnInit() {
    console.log('top-room-component');
  }
}
