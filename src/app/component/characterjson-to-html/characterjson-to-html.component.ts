import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characterjson-to-html',
  templateUrl: './characterjson-to-html.component.html',
  styleUrls: ['./characterjson-to-html.component.css']
})
export class CharacterjsonToHtmlComponent implements OnInit {

  private fullJson;

  private type = 'SUZUKI';
  private race = 'ばいく';
  private job = '販売業';

  constructor() { }

  ngOnInit() {
  }

  getJson(list: any) {

    if (list <= 0) { return; } // 何も指定されていなければ何もしない

    let fileobj = list[0];  // 指定されるファイルは1つのみなので[0]
    let reader = new FileReader();

    reader.onload = function() {  // readAsTextでファイルの読み込みが終わったら呼び出される
      console.log(reader.result);
      CharacterjsonToHtmlComponent.prototype.pushJson(reader.result);  // ファイルの内容を各値に入れていく
    };
    reader.readAsText(fileobj);  // ファイルの内容をtextで読む (reader.onloadのreader.resultがstringになるへ)
  }

  // FileReaderで読み込んだJSONを引数にして各要素に値を入れていく
  pushJson (str) {
    let jsonobj = JSON.parse(str); // stringのままなのでJSON(object)に変換
    this.fullJson = jsonobj;
  }

}
