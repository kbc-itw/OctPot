import { Injectable } from '@angular/core';

import { TabModel } from '../model/tab-model';

@Injectable({
  providedIn: 'root'
})
export class SwitchTabService {

  private _tabs: Array<TabModel>;

  public get tabs(): Array<TabModel> {
    return this._tabs;
  }

  public set tabs(tabs: Array<TabModel>) {
    this._tabs = tabs;
  }

  constructor() { }

  public getCurrentContents(): any {
    for (const target in this._tabs) {
      if (this._tabs.hasOwnProperty(target)) {
        if (this._tabs[target].current) {
          return this._tabs[target].contents;
        }
      }
    }
  }


  public changeCurrentContents(name: string): any {
    let contents: any;
    for (const target in this._tabs) {
      if (this._tabs.hasOwnProperty(target)) {
        this._tabs[target].current = false;

        if (this._tabs[target].name === name) {
          this._tabs[target].current = true;
          contents = this._tabs[target].contents;
        }
      }
    }
    return contents;
  }
}
