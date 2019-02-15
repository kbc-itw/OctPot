import { Injectable } from '@angular/core';

@Injectable()
export class CharacterManagementService {
  constructor() {
    var reader = new FileReader();
    reader.readAsDataURL(new Blob());
  }

  getItem( key ) {
    return  JSON.parse(localStorage.getItem(key));
  }

  setItem(key , value) {
    let ls = [];
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
