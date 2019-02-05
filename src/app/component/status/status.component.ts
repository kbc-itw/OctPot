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
  private charaStatusList: CharaStatus[] = []; // 使用するキャラの現在のステータスが入ってる配列

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
        this.charaStatusList.push(new CharaStatus(
            chachacha.Setting.character.name,
            chachacha.Status.fluctuationStatus.health,
            chachacha.Status.fluctuationStatus.san,
            chachacha.Status.fluctuationStatus.mp));
      }
    );
  }

  // +-ボタンが押されたら対応するステータスを+-する
  changeStatus(status: string, point: number, index: number) {
    switch (status) {
      case ('hp'):
        this.charaStatusList[index].hp += point;
        break;
      case ('mp'):
        this.charaStatusList[index].mp += point;
        break;
      case ('san'):
        this.charaStatusList[index].san += point;
        break;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

// 使用するキャラの現在のステータスを記録しておくクラス
export class CharaStatus {
  name: string = '';
  hp: number = 0;
  san: number = 0;
  mp: number = 0;

  constructor(name: string, hp: number, san: number, mp: number) {
    this.name = name;
    this.hp = hp;
    this.san = san;
    this.mp = mp;
  }
}
