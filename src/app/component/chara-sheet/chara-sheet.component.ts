import { Component, OnInit, OnDestroy } from '@angular/core';
import { Convert, Chara, Setting, Character, Skill,
  Behavior, Status, BaseStatus, FluctuationStatus,
  Items, Item, Weapon, Profile } from '../../model/character-info-model';

import { Subscription } from 'rxjs';
import { CharacterDataListService } from '../../Service/character-data-list.service';

@Component({
  selector: 'app-chara-sheet',
  templateUrl: './chara-sheet.component.html',
  styleUrls: ['./chara-sheet.component.css'],
  providers: [CharacterDataListService]
})
export class CharaSheetComponent implements OnInit, OnDestroy {

  private combats;
  private searchs;
  private behaviors;
  private negotiations;
  private knowledges;
  private wepons;
  private items;

  // Setting
  private type;
  private race;
  private job;
  private images;
  // Setting.character
  private name;
  private gender;
  private height;
  private weight;
  private birthplace;
  private hairColor;
  private eyeColor;
  // Status
  // Status.basestatus
  private str;
  private con;
  private pow;
  private dex;
  private siz;
  private app;
  private int;
  private edu;
  private income_and_property;
  // Status.flutuationStatus
  private san;
  private luck;
  private idea;
  private knowledge;
  private health;
  private mp;
  private VocationalSkill;
  private HobbySkill;
  private DamegeBonus;
  // Status.reDice
  private diceStr;
  private diceCon;
  private diceDex;
  private diceApp;
  private diceSiz;
  private diceInt;
  private diceEdu;
  private diceIncome_and_property;
  // Skill
  // Skill.combat
  private combatSkillName;
  private combatInitialValue;
  private combatJobPoint;
  private combatHobbyPoint;
  private combatGrowthPoint;
  private combatOtherPoint;
  // Skill.search
  private searchSkillName;
  private searchInitialValue;
  private searchJobPoint;
  private searchHobbyPoint;
  private searchGrowthPoint;
  private searchOtherPoint;
  // Skill.behavior
  private behaviorSkillName;
  private behaviorInitialValue;
  private behaviorJobPoint;
  private behaviorHobbyPoint;
  private behaviorGrowthPoint;
  private behaviorOtherPoint;
  // Skill.negotiation
  private negotiationSkillName;
  private negotiationInitialValue;
  private negotiationJobPoint;
  private negotiationHobbyPoint;
  private negotiationGrowthPoint;
  private negatiationOtherPoint;
  // Skill.knowledge
  private knowledgeSkillName;
  private knowledgeInitialValue;
  private knowledgeJobPoint;
  private knowledgeHobbyPoint;
  private knowledgeGrowthPoint;
  private knowledgeOtherPoint;
  // items
  // items.wepom
  private weponName;
  private successRate;
  private damage;
  private range;
  private attackCount;
  private loadingCount;
  private endurance;
  private weponOther;
  // items.item
  private itemName;
  private number;
  private itemOther;
  // profile
  private Career;
  private Encounter;
  private OtherMemo;

  private charaList: Chara[] = [];
  public subscription: Subscription;
  constructor( private clistService: CharacterDataListService) {
    this.charaList = [];
  }

  ngOnInit() {
    this.subscription = this.clistService.sharedDataSource$.subscribe(
      data => {
        let chachacha = Convert.toChara(data);
        this.charaList.push(chachacha);
        console.log(this.charaList);
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // HTMLでファイルが選択されたら呼ばれる予定
  // ファイルを受け取り、ファイルの中身からCharaを生成する
  getJson(list: any) {
    if (list <= 0) { return; } // 何も指定されていなければ何もしない
    let fileobj = list[0];  // 指定されるファイルは1つのみなので[0]
    let reader = new FileReader();
    reader.onload = () => {  // readAsTextでファイルの読み込みが終わったら呼び出される
      this.clistService.onNotifyShareDataChanged(reader.result);
    };
    reader.readAsText(fileobj);  // ファイルの内容をtextで読む (reader.onloadのreader.resultがstringになるへ)
  }

  // jsonの文字列からCharaクラスを作成して、一覧に加える
  addCharacter( jsoninfo ) {
    let chachacha = Convert.toChara(jsoninfo);
    let len = 0;
    this.charaList.push(chachacha);
    console.log('addChara: \n', this.charaList);
  }


  // 選択されたキャラ情報をキャラシートに出力する
  // そのキャラが配列の何番目に入っているか引数で受け取る
  showHTML(index) {

    console.log('SHOWHTML: \n', this.charaList[index]);
    let chara = this.charaList[index];

    // Setting
    this.type = chara.Setting.type;
    this.race = chara.Setting.race;
    this.job = chara.Setting.job;
    this.images = chara.Setting.images;
    // Setting.character
    this.name = chara.Setting.character.name;
    this.gender = chara.Setting.character.gender;
    this.height = chara.Setting.character.height;
    this.weight = chara.Setting.character.weight;
    this.birthplace = chara.Setting.character.birthplace;
    this.hairColor = chara.Setting.character.hairColor;
    this.eyeColor = chara.Setting.character.eyeColor;
    // Status
    // Status.basestatus
    this.str = chara.Status.baseStatus.str;
    this.con = chara.Status.baseStatus.con;
    this.pow = chara.Status.baseStatus.pow;
    this.dex = chara.Status.baseStatus.dex;
    this.siz = chara.Status.baseStatus.siz;
    this.app = chara.Status.baseStatus.app;
    this.int = chara.Status.baseStatus.int;
    this.edu = chara.Status.baseStatus.edu;
    this.income_and_property = chara.Status.baseStatus.income_and_property;
    // Status.flutuationStatus
    this.san = chara.Status.fluctuationStatus.san;
    this.luck = chara.Status.fluctuationStatus.luck;
    this.idea = chara.Status.fluctuationStatus.idea;
    this.knowledge = chara.Status.fluctuationStatus.knowledge;
    this.health = chara.Status.fluctuationStatus.health;
    this.mp = chara.Status.fluctuationStatus.mp;
    this.VocationalSkill = chara.Status.fluctuationStatus.VocationalSkill;
    this.HobbySkill = chara.Status.fluctuationStatus.HobbySkill;
    this.DamegeBonus = chara.Status.fluctuationStatus.DamegeBonus;
    // Skill
    // Skill.combat
    this.combats = chara.Skill.conbat;
    // Skill.search
    this.searchs = chara.Skill.search;
    // Skill.behaviors
    this.behaviors = chara.Skill.behavior;
    // Skill.negotiations
    this.negotiations = chara.Skill.negotiation;
    // Skill.knowledges
    this.knowledges = chara.Skill.knowledge;
    // Items.wepons
    this.wepons = chara.items.weapon;
    // Items.items
    this.items = chara.items.item;

    this.Career = chara.profile.Career;
    this.Encounter = chara.profile.Encounter;
    this.OtherMemo = chara.profile.otherMemo;
  }

}
