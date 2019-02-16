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

  setItem(key , value) {
    let ls = Array();
    ls = JSON.parse(localStorage.getItem(key));
    ls.push( value );
    localStorage.setItem( key, JSON.stringify(ls));

  }

  delete( key , index ) {
    let ls = JSON.parse(localStorage.getItem(key));
    ls.splice( index , 1);
    localStorage.setItem( key, JSON.stringify(ls));

  }

}
