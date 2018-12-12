import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characterjson-to-html',
  templateUrl: './characterjson-to-html.component.html',
  styleUrls: ['./characterjson-to-html.component.css']
})
export class CharacterjsonToHtmlComponent implements OnInit {

  private type = 'SUZUKI';
  private race = 'ばいく';
  private job = '販売業';

  constructor() { }

  ngOnInit() {
  }

}
