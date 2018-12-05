import {Component, OnInit} from '@angular/core';

import {SwitchTabService} from './Service/switch-tab.service';
import {TabsManagerService} from './Service/tabs-manager.service';
import {TabModel} from './model/tab-model';

import {MemoComponent} from './component/memo/memo.component';
import {DiceComponent} from './component/dice/dice.component';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  private memoTabService: SwitchTabService = new SwitchTabService();
  private memoTabs: Array<TabModel> = new Array();

  constructor(private tabsManagerService: TabsManagerService) {
    tabsManagerService = new TabsManagerService;
  }

  ngOnInit() {
    this.memoTabs.push(new TabModel('メモ', MemoComponent, true));
    this.memoTabs.push(new TabModel('ダイス1', DiceComponent, false));
    this.memoTabs.push(new TabModel('ダイス2', DiceComponent, false));
    this.memoTabService.tabs = this.memoTabs;
    this.tabsManagerService.addTabService('memoTabService', this.memoTabService);
  }
}

