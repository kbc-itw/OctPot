import { Injectable } from '@angular/core';

import { SwitchTabService } from './switch-tab.service';



@Injectable({
  providedIn: 'root'
})
export class TabsManagerService {
  private _tabs_group: {[key: string]: SwitchTabService} = {};

  public addTabService(tabName: string, tabService: SwitchTabService) {
    this._tabs_group[tabName] = tabService;
  }

  public getTabService(searchName: string) :SwitchTabService {
    var result: SwitchTabService = null;
    for(var tabName in this._tabs_group) {
      if(tabName == searchName) {
        result = this._tabs_group[searchName];
      }
    }
    return result;
  }

  constructor() {
  }
}
