import { Component, OnInit, OnDestroy } from '@angular/core';
import { Convert, Chara, Setting, Character, Skill,
  Behavior, Status, BaseStatus, FluctuationStatus,
  Items, Item, Weapon, Profile } from '../../model/character-info-model';

import { Subscription } from 'rxjs';
import { CharacterDataListService } from '../../Service/character-data-list.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  private charaList: Chara[] = [];  // 使用するキャラが入っている配列
  public subscription: Subscription;
  constructor( private clistService: CharacterDataListService) {}

  ngOnInit() {
    // どこかでcharacter-date-list.serviceのnext()が使われたら動きます。
    // 簡単いうと誰かが送信した値をdataで受け取れます
    this.subscription = this.clistService.sharedDataSource$.subscribe(
      data => {
        let chachacha = Convert.toChara(data);
        this.charaList.push(chachacha);
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
