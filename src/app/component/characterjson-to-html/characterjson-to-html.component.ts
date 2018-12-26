import { Component, OnInit } from '@angular/core';
import { Convert, Chara, Setting, Character, Skill,
      Behavior, Status, BaseStatus, FluctuationStatus,
      Items, Item, Weapon, Profile } from '../../model/character-info-model';  // fromには、このファイルの場所を指定する


@Component({
  selector: 'app-characterjson-to-html',
  templateUrl: './characterjson-to-html.component.html',
  styleUrls: ['./characterjson-to-html.component.css']
})
export class CharacterjsonToHtmlComponent implements OnInit {

  private fullJson;

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


  constructor() { }

  ngOnInit() {
  }

  getJson(list: any) {

    if (list <= 0) { return; } // 何も指定されていなければ何もしない

    let fileobj = list[0];  // 指定されるファイルは1つのみなので[0]
    let reader = new FileReader();

    reader.onload = function() {  // readAsTextでファイルの読み込みが終わったら呼び出される
      console.log(reader.result);
//      CharacterjsonToHtmlComponent.prototype.pushJson(reader.result);  // ファイルの内容を各値に入れていく
      CharacterjsonToHtmlComponent.prototype.pushHTML(reader.result);  // ファイルの内容を各値に入れていく

    };
    reader.readAsText(fileobj);  // ファイルの内容をtextで読む (reader.onloadのreader.resultがstringになるへ)
  }

  // FileReaderで読み込んだJSONを引数にして各要素に値を入れていく
  pushJson (str) {
    let jsonobj = JSON.parse(str); // stringのままなのでJSON(object)に変換
    this.fullJson = jsonobj;
  }

  pushHTML ( str ) {
    let chara: Chara = Convert.toChara(str);
    console.log(chara);
    console.log(typeof(chara));

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
    console.log(chara.Status);
    console.log(chara.Status.baseStatus);
    console.log(chara.Status.baseStatus.str);

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
    // Status.reDice
    this.diceStr = chara.Status.reDice.str;
    this.diceCon = chara.Status.reDice.con;
    this.diceDex = chara.Status.reDice.dex;
    this.diceApp = chara.Status.reDice.app;
    this.diceSiz = chara.Status.reDice.siz;
    this.diceInt = chara.Status.reDice.int;
    this.diceEdu = chara.Status.reDice.edu;
    this.diceIncome_and_property = chara.Status.reDice.income_and_property;
    // Skill
    // Skill.combat

  }

}
