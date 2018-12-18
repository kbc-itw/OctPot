import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characterjson-to-html',
  templateUrl: './characterjson-to-html.component.html',
  styleUrls: ['./characterjson-to-html.component.css']
})
export class CharacterjsonToHtmlComponent implements OnInit {

  private jsonman;

  private type = 'SUZUKI';
  private race = 'ばいく';
  private job = '販売業';

  constructor() { }

  ngOnInit() {
  }

  getJson(list: any) {
    if (list <= 0) { return; } // 何も指定されていなければ何もしない

    var str: any;
    console.log(list);
    this.jsonman = list[0];
    console.log(this.jsonman);

    let reader = new FileReader();

    // reader.resultの値をstrに入れたいけどできないでござる
    reader.onload = function() {
      console.log(reader.result);
      let res = reader.result;
      str = res.toString;
    };
    reader.readAsText(this.jsonman);
    console.log(str);
  }
}
