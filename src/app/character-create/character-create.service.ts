// キャラクターを作成する処理
// 作成画面をhymlで
// 基本フロー3,6,9の処理
import { Injectable } from '@angular/core';

// 3,アクターは作成するキャラクターPCかNPCかを選択する。
@Injectable()
export class CharacterCreateService {
  /*
  private str: HTMLElement = document.getElementById('str');
  private con: HTMLElement = document.getElementById('con');
  private pow: HTMLElement = document.getElementById('pow');
  private dex: HTMLElement = document.getElementById('dex');
  private app: HTMLElement = document.getElementById('app');
  private siz: HTMLElement = document.getElementById('siz');
  private int: HTMLElement = document.getElementById('int');
  private edu: HTMLElement = document.getElementById('edu');
  private SAN: HTMLElement = document.getElementById('SAN');
  private luck: HTMLElement = document.getElementById('luck');
  private idea: HTMLElement = document.getElementById('idea');
  private knowledge: HTMLElement = document.getElementById('knowledge');
  private health: HTMLElement = document.getElementById('health');
  private mp: HTMLElement = document.getElementById('mp');
  private VocationalSkill: HTMLElement = document.getElementById('VocationalSkill');
  private HobbySkill: HTMLElement = document.getElementById('HobbySkill');
  private DamegeBonus: HTMLElement = document.getElementById('DamegeBonus');
  */
  constructor() {
    /*
    this.str.addEventListener('click', () => {
      let result = this.select('str');
      this.str.innerText = String(result[1]);
    }, false);
    this.con.addEventListener('click', () => {
      let result = this.select('con');
      let siz = parseInt(this.siz.innerText);
      this.con.innerText = String(result[1]);
      this.health.innerText = String(this.status('health', result[1], siz));
    }, false);
    this.pow.addEventListener('click', () => {
      let result = this.select('pow');
      this.pow.innerText = String(result[1]);
      this.SAN.innerText = String(this.status('SAN', result[1]));
      this.luck.innerText = String(this.status('luck', result[1]));
      this.mp.innerText = String(result[1]);
    }, false);
    this.dex.addEventListener('click', () => {
      let result = this.select('dex');
      this.dex.innerText = String(result[1]);
    }, false);
    this.app.addEventListener('click', () => {
      let result = this.select('app');
      this.app.innerText = String(result[1]);
    }, false);
    this.siz.addEventListener('click', () => {
      let result = this.select('siz');
      let con = parseInt(this.con.innerText);
      this.siz.innerText = String(result[1]);
      this.health.innerText = String(this.status('health', result[1], con));
    }, false);
    this.int.addEventListener('click', () => {
      let result = this.select('int');
      this.int.innerText = String(result[1]);
      this.idea.innerText = String(this.status('idea', result[1]));
      this.HobbySkill.innerText = String(this.status('HobbySkill', result[1]));
    }, false);
    this.edu.addEventListener('click', () => {
      let result = this.select('edu');
      this.edu.innerText = String(result[1]);
      this.knowledge.innerText = String(this.status('knowledge', result[1]));
      this.VocationalSkill.innerText = String(this.status('VocationalSkill', result[1]));
    }, false);
    */
  }

  judge(acter): any {
    if (acter === 'PC') {

    } else　if (acter === 'NPC') {

    } else {
      this.errorlog(acter);
    }
  }
// 1～6の乱数作成。それを3回繰り返したのを合計して返す。(3d6)
// 6,システムはダイスロールの値からをステータスを決める。

  private diceroll(select): number[] {
    let dice: number[] = [3];
    dice[3] = 0;
    if (select === '3D6') {
      let diceroll: number;
      for (let i = 0; i < 3; i++) {
        diceroll = Math.floor(Math.random() * 6 + 1);
        dice[3] += diceroll;
        dice[i] = diceroll;
      }
      return dice;
   } else if (select === '2D6') {
      dice[2] = 0;
      for (let i = 0; i < 2; i++) {
        let diceroll = Math.floor(Math.random() * 6 + 1);
        dice[2] += diceroll;
        dice[i] = diceroll;
      }
      return dice;
    } else {
      this.errorlog(select);
      return null;
    }
  }

// 入力されたアクションからダイスの種類を決め,ダイスを振る
  select(action): any {
    let result = 0;
    let dice: number[] = [3];
    for (let i = 0; i < 4; i++) {
      dice[i] = 0;
    }
    switch (action) {
      case 'edu':
        result += 3;
      case 'str':
      case 'con':
      case 'pow':
      case 'dex':
      case 'app':
      case 'income':
        dice = this.diceroll('3D6');
        result += dice[3];
        break;
      case 'siz':
      case 'int':
        dice = this.diceroll('2D6');
        result += 3;
        result += dice[2];
        break;
      default:
        this.errorlog(action);
    }
    console.log(result);
    console.log(dice);
    console.log(dice[1]);
    return [dice, result];
  }

// ダイスロールの結果からステータスの値を求める。
  status(status, diceresult, diceresult2  = null) {
    let result = 0;
    switch (status) {
      case 'SAN':
      case 'luck':
      case 'idea':
      case 'knowledge':
        result += diceresult * 5;
        break;
      case 'mp':
        result += diceresult;
        break;
      case 'HobbySkill':
        result += diceresult * 10;
        break;
      case 'VocationalSkill':
        result += diceresult * 20;
        break;
      case 'health':
        result += (diceresult + diceresult2) / 2;
        break;
      default:
        this.errorlog(status);
    }
    return String(result);
  }


// 9,システムは情報をjson形式で管理用フォルダに保存する。

// jsonに変換
  change(data) {
  // let target = data.target;
  // let file = target.files;
  let jsondata = JSON.stringify(data);
  }

// ファイルのダウンロード（保存）
  save(content, filename) {
    let blob = new Blob([ content ], { 'type' : 'text/plain' });
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      // document.getElementById('download').href = window.URL.createObjectURL(blob);
    }
  }
  errorlog(e) {
    e.onerror = (msg, url, line, col, error) => {
      switch (e) {
        case null:
        case undefined:
          console.log(msg + ':' + line);
          console.log('引数が見つかりません。');
      }
    };
  }

  test() {
    console.log('引数が見つかりません。');
  }

}

// window.onload = (e) => {
//  let characre: CharacterCreate = new CharacterCreate();
/*
  let action = document.getElementById('action');
  action.addEventListener('click', function () {});

  let file = document.getElementById('file');
  file.addEventListener('click', this.save());
  */
// }
