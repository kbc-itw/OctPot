import { Injectable } from '@angular/core';

@Injectable()
export class CharacterManagementService {
  constructor() {
    var reader = new FileReader();
    reader.readAsDataURL(new Blob());
  }

  getItem( key ) {
    if (localStorage.getItem(key) === null) {
      console.log('null');
      localStorage.setItem( key, JSON.stringify( Array()) );
      return '';
    } else {
      return JSON.parse( localStorage.getItem(key));
    }
  }

  // ローカルストレージから指定したアイテムを一個取り出す
  // key: PC or NPC, index: ほしいアイテムが配列の何番目か
  getOneItem(key, index) {
    if (localStorage.getItem(key) === null) {
      console.log('null');
      localStorage.setItem( key, JSON.stringify( Array()) );
      return '';
    } else {
      let storageArray = this.getItem(key);
      return storageArray[index];
    }
  }

  setItem(key , value) {
    let ls = Array();
    ls = JSON.parse(localStorage.getItem(key));
    ls.push( value );
    localStorage.setItem( key, JSON.stringify(ls));

  }

  // ローカルストレージの指定したオブジェクトの内容を書き換えます。
  // key:PC or NPC, index: 配列の番号, value:その配列に新たに入れたい値
  editItem(key, index, value) {
    let ls = Array();
    ls = JSON.parse(localStorage.getItem(key));
    ls[index] = value;
    localStorage.setItem( key, JSON.stringify(ls));
  }

  delete( key , index ) {
    let ls = JSON.parse(localStorage.getItem(key));
    ls.splice( index , 1);
    localStorage.setItem( key, JSON.stringify(ls));

  }

}
