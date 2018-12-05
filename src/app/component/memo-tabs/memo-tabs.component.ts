import {Component, OnInit} from '@angular/core';

import {SwitchTabService} from '../../Service/switch-tab.service';
import {TabsManagerService} from '../../Service/tabs-manager.service';
import {TabModel} from '../../model/tab-model';

@Component({
  selector: 'app-memo-tabs',
  templateUrl: './memo-tabs.component.html',
  styleUrls: ['./memo-tabs.component.css']
})
export class MemoTabsComponent implements OnInit {
  private switchTabSrvice: SwitchTabService;
  private _currentTab: any;
  private _tabs: Array<TabModel>;

  public get currentTab(): any {
    return this._currentTab;
  }

  public get tabs(): Array<TabModel> {
    return this._tabs;
  }

  constructor(
    private tabsManagerService: TabsManagerService
  ) {
  }

  ngOnInit() {
    this.switchTabSrvice = this.tabsManagerService.getTabService('memoTabService');
    this._tabs = this.switchTabSrvice.tabs;
    this._currentTab = this.switchTabSrvice.getCurrentContents();
  }

  public onClick($event) {
    this._currentTab = this.switchTabSrvice.changeCurrentContents($event.target.innerHTML);
  }
}
