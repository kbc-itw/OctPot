import { Component, OnInit } from '@angular/core';
import { CharacterCreateService } from '../../Service/character-create.service';
import { SkillList } from '../../model/skillList';
import { Convert, Chara, Setting, Character, Skill,
      Behavior, Status, BaseStatus, FluctuationStatus,
      Items, Item, Weapon, Profile } from '../../model/character-info-model';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.css']
})
export class CharacterCreateComponent implements OnInit {

  private filename = 'octpot.json';

  // Setting
  private stype;
  private srace;
  private sjob;
  private simages;
  // Setting.character
  private cname;
  private cgender;
  private cheight;
  private cweight;
  private cbirthplace;
  private chairColor;
  private ceyeColor;
  // Status
  // Status.basestatus
  private bstr;
  private bcon;
  private bpow;
  private bdex;
  private bsiz;
  private bapp;
  private bint;
  private bedu;
  private bincome_and_property;
  // Status.flutuationStatus
  private fsan;
  private fluck;
  private fidea;
  private fknowledge;
  private fhealth;
  private fmp;
  private fVocationalSkill;
  private fHobbySkill;
  private fDamegeBonus;
  // Status.reDice
  private diceStr = 3;
  private diceCon = 3;
  private dicePow = 3;
  private diceDex = 3;
  private diceApp = 3;
  private diceSiz = 3;
  private diceInt = 3;
  private diceEdu = 3;
  private diceIncome_and_property = 3;
  // Skill
  // profile
  private pCareer;
  private pEncounter;
  private pOtherMemo;

  private combatList = [];  // 戦闘技能の配列
  private searchList = []; // 探索技能の配列
  private behaviorList = []; // 行動技能の配列
  private negotiationList = []; // 交渉技能の配列
  private knowledgeList = []; // 知識技能の配列
  private weponList = []; // 所持品(武具)の配列
  private itemslist = [];  // 所持品(item)の配列

  // スキルポイント合計
  private combatPointAll = 0;
  private searchPointAll = 0;
  private behaviorPointAll = 0;
  private negotiationPointAll = 0;
  private knowledgePointAll = 0;

  // 保有ポイント全部
  private professionalPoint = 0;
  private interestPoint = 0;
  // 使用できる保有ポイント
  private remProfessionalPoint = 0;
  private remInterestPoint = 0;

  constructor(private characre: CharacterCreateService) {
    // 何のスキルがあるか配列から読み込むメソッド達を使う
    let skillList = new SkillList();
    this.combatList = skillList.combatList;
    this.searchList = skillList.searchList;
    this.behaviorList = skillList.behaviorList;
    this.negotiationList = skillList.negotiationList;
    this.knowledgeList = skillList.knowledgeList;
    this.generateWeponFrame();
    this.generateItemFrame();
  }

  dontKyetype(point, skill, index, listName, pointName) {
    if ( pointName === 'job' ) {
      switch (listName) {
        case 'combat' :
          this.combatList[index].jobPoint = 0;
          break;
        case 'search' :
          this.searchList[index].jobPoint = 0;
          break;
        case 'negotiation' :
          this.negotiationList[index].jobPoint = 0;
          break;
        case 'knowledge' :
          this.knowledgeList[index].jobPoint = 0;
          break;
      }
    }else if (pointName === 'hobby' ) {
      switch (listName) {
        case 'combat' :
          this.combatList[index].hobbyPoint = 0;
          break;
        case 'search' :
          this.searchList[index].hobbyPoint = 0;
          break;
        case 'negotiation' :
          this.negotiationList[index].hobbyPoint = 0;
          break;
        case 'knowledge' :
          this.knowledgeList[index].hobbyPoint = 0;
          break;
      }
    }else if (pointName === 'growth') {
      switch (listName) {
        case 'combat' :
          this.combatList[index].growthPoint = 0;
          break;
        case 'search' :
          this.searchList[index].growthPoint = 0;
          break;
        case 'negotiation' :
          this.negotiationList[index].growthPoint = 0;
          break;
        case 'knowledge' :
          this.knowledgeList[index].growthPoint = 0;
          break;
      }
    }else if (pointName === 'other') {
      switch (listName) {
        case 'combat' :
          this.combatList[index].otherPoint = 0;
          break;
        case 'search' :
          this.searchList[index].otherPoint = 0;
          break;
        case 'negotiation' :
          this.negotiationList[index].otherPoint = 0;
          break;
        case 'knowledge' :
          this.knowledgeList[index].otherPoint = 0;
          break;
      }
    }

    this.totalcalc(point, skill, index, listName, pointName);
  }

  totalSingleSkillPoint(pointName) { // pointNameで指定されたポイント(職業P or 興味P)の合計値を返す
    let usedPoint = 0;
    if ( pointName === 'job' ) {
      this.combatList.forEach(function(skill){
        usedPoint += skill['jobPoint'];
      });
      this.searchList.forEach(function(skill){
        usedPoint += skill['jobPoint'];
      });
      this.behaviorList.forEach(function(skill){
        usedPoint += skill['jobPoint'];
      });
      this.negotiationList.forEach(function(skill){
        usedPoint += skill['jobPoint'];
      });
      this.knowledgeList.forEach(function(skill){
        usedPoint += skill['jobPoint'];
      });
    }else if (pointName === 'hobby' ) {
      this.combatList.forEach(function(skill){
        usedPoint += skill['hobbyPoint'];
      });
      this.searchList.forEach(function(skill){
        usedPoint += skill['hobbyPoint'];
      });
      this.behaviorList.forEach(function(skill){
        usedPoint += skill['hobbyPoint'];
      });
      this.negotiationList.forEach(function(skill){
        usedPoint += skill['hobbyPoint'];
      });
      this.knowledgeList.forEach(function(skill){
        usedPoint += skill['hobbyPoint'];
      });
    }
    return usedPoint;
  }

  // point: 割り振っているポイント skill; スキルの名前 index: そのスキルがそのスキル配列の何番目かcombatlist[index]
  // listName: スキルリストの名前combat,search... pointName: jobポイントかhobbyポイントか
  totalcalc(point, skill, index, listName, pointName) {  // 残り使えるスキルポイントを計算する。pointNameで職業Pか趣味Pか判定する
    this.underHundredTotalSkillPoint(point, skill, index, listName, pointName);
    if ( pointName === 'job' ) {
      this.jobPointCalc(point, skill, index, listName, pointName);
    }else if (pointName === 'hobby' ) {
      this.hobbyPointCalc(point, skill, index, listName, pointName);
    }
  }

  jobPointCalc(point, skill, index, listName, pointName) {  // 割り振れる職業Pの計算制御
    let usedPoint = 0;
    usedPoint = this.totalSingleSkillPoint(pointName);

    if (usedPoint > this.professionalPoint || point < 0) {  // 入力されたポイントが大きすぎる場合なかったことにする。
      switch (listName) {
        case 'combat' :
          this.combatList[index].jobPoint = 0;
          this.jobPointCalc(this.combatList[index].jobPoint, skill, index, listName, pointName);
          break;
        case 'search' :
          this.remProfessionalPoint = this.professionalPoint - usedPoint - point;
          this.jobPointCalc(this.combatList[index].jobPoint, skill, index, listName, pointName);
          this.searchList[index].jobPoint = 0;
          break;
        case 'negotiation' :
          this.remProfessionalPoint = this.professionalPoint - usedPoint - point;
          this.jobPointCalc(this.combatList[index].jobPoint, skill, index, listName, pointName);
          this.negotiationList[index].jobPoint = 0;
          break;
        case 'knowledge' :
          this.remProfessionalPoint = this.professionalPoint - usedPoint - point;
          this.jobPointCalc(this.combatList[index].jobPoint, skill, index, listName, pointName);
          this.knowledgeList[index].jobPoint = 0;
          break;
      }
      return;
    }

    this.remProfessionalPoint = this.professionalPoint - usedPoint;
  }

  hobbyPointCalc(point, skill, index, listName, pointName) {  // 割り振れる興味Pの計算制御
    let usedPoint = 0;
    usedPoint = this.totalSingleSkillPoint(pointName);

    if (usedPoint > this.interestPoint) {  // 入力されたポイントが大きすぎる場合なかったことにする。
      switch (listName) {
        case 'combat' :
          this.combatList[index].hobbyPoint = 0;
          break;
        case 'search' :
          this.searchList[index].hobbyPoint = 0;
          break;
        case 'negotiation' :
          this.negotiationList[index].hobbyPoint = 0;
          break;
        case 'knowledge' :
          this.knowledgeList[index].hobbyPoint = 0;
          break;
      }
      return;
    }

    this.remInterestPoint = this.interestPoint - usedPoint;
  }

  underHundredTotalSkillPoint(point, skill, index, listName, pointName) { // 各スキルの合計値が99を超えないようにする
    let choiceSkill = [];
    switch (listName) {
      case 'combat' :
        choiceSkill = this.combatList[index];
        break;
      case 'search' :
        choiceSkill = this.searchList[index];
        break;
      case 'negotiation' :
        choiceSkill = this.negotiationList[index];
        break;
      case 'knowledge' :
        choiceSkill = this.knowledgeList[index];
        break;
    }
    let totalSkillPoint = 0;
    totalSkillPoint += choiceSkill['initialValue'];
    totalSkillPoint += choiceSkill['jobPoint'];
    totalSkillPoint += choiceSkill['hobbyPoint'];
    totalSkillPoint += choiceSkill['growthPoint'];
    totalSkillPoint += choiceSkill['otherPoint'];

    if ( totalSkillPoint > 99 ) {
      if ( pointName === 'job' ) {
        switch (listName) {
          case 'combat' :
            this.combatList[index].jobPoint = 0;
            break;
          case 'search' :
            this.searchList[index].jobPoint = 0;
            break;
          case 'negotiation' :
            this.negotiationList[index].jobPoint = 0;
            break;
          case 'knowledge' :
            this.knowledgeList[index].jobPoint = 0;
            break;
        }
      }else if (pointName === 'hobby' ) {
        switch (listName) {
          case 'combat' :
            this.combatList[index].hobbyPoint = 0;
            break;
          case 'search' :
            this.searchList[index].hobbyPoint = 0;
            break;
          case 'negotiation' :
            this.negotiationList[index].hobbyPoint = 0;
            break;
          case 'knowledge' :
            this.knowledgeList[index].hobbyPoint = 0;
            break;
        }
      }else if (pointName === 'growth') {
        switch (listName) {
          case 'combat' :
            this.combatList[index].growthPoint = 0;
            break;
          case 'search' :
            this.searchList[index].growthPoint = 0;
            break;
          case 'negotiation' :
            this.negotiationList[index].growthPoint = 0;
            break;
          case 'knowledge' :
            this.knowledgeList[index].growthPoint = 0;
            break;
        }
      }else if (pointName === 'other') {
        switch (listName) {
          case 'combat' :
            this.combatList[index].otherPoint = 0;
            break;
          case 'search' :
            this.searchList[index].otherPoint = 0;
            break;
          case 'negotiation' :
            this.negotiationList[index].otherPoint = 0;
            break;
          case 'knowledge' :
            this.knowledgeList[index].otherPoint = 0;
            break;
        }
      }
    }
  }



  throwDice(dicename) {
    function throwing(times, num, plus) {  // さいころ処理 times:回数 num:ダイスの面数 plus:あとで足す分
      let result = 0;  // ダイス合計
      function getRandomIntInclusive(max) {
        let min = Math.ceil(1);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      for (let i = 0; i < times; i++ ) {
        let res = getRandomIntInclusive(num);
        result += res;
      }
      result += dicePlus;
      return result;
    }

    let diceNum = 0;  // x面ダイス
    let diceTimes = 0;  // x回振る
    let dicePlus = 0;  // xプラス

    switch (dicename) {
      case 'str' :
        diceNum = 6;
        diceTimes = 3;
        break;

      case 'con' :
        diceNum = 6;
        diceTimes = 3;
        break;

      case 'pow' :
        diceNum = 6;
        diceTimes = 3;
        break;

      case 'dex' :
        diceNum = 6;
        diceTimes = 3;
        break;

      case 'app' :
        diceNum = 6;
        diceTimes = 3;
        break;

      case 'siz' :
        diceNum = 6;
        diceTimes = 2;
        dicePlus = 6;
        break;

      case 'int' :
        diceNum = 6;
        diceTimes = 2;
        dicePlus = 6;
        break;

      case 'edu' :
        diceNum = 6;
        diceTimes = 3;
        dicePlus = 3;
        break;

      case 'income' :
        diceNum = 6;
        diceTimes = 3;
        break;

      case 'allDice' :
        this.throwDice('str');
        this.throwDice('con');
        this.throwDice('pow');
        this.throwDice('dex');
        this.throwDice('app');
        this.throwDice('siz');
        this.throwDice('int');
        this.throwDice('edu');
        this.throwDice('income');
        break;
    }

    let individualProfessionalPoint = 0;
    let individualInterestPoint = 0;
    // ダイスを振って各項目に入れる
    if (!(dicename === 'allDice')) {
      let result = throwing(diceTimes, diceNum, dicePlus);
      switch (dicename) {
        case 'str' :
          this.bstr = result;
          break;

        case 'con' :
          this.bcon = result;
          if (this.bsiz) {
            this.fhealth = (this.bsiz + result) / 2;
          }
          break;

        case 'pow' :
          this.bpow = result;
          this.fsan = result * 5;
          this.fluck = result * 5;
          this.fmp = result;
          break;

        case 'dex' :
          this.bdex = result;
          this.combatList[0].initialValue = result * 2;
          break;

        case 'app' :
          this.bapp = result;
          break;

        case 'siz' :
          this.bsiz = result;
          if (this.bcon) {
            this.fhealth = Math.round((this.bcon + result) / 2);
          }
          break;

        case 'int' :
          this.bint = result;
          this.fidea = result * 5;
          this.fHobbySkill = result * 10;
          this.interestPoint = result * 10;
          this.remInterestPoint = result * 10;
          break;

        case 'edu' :
          this.bedu = result;
          this.fknowledge = result * 5;
          this.fVocationalSkill = result * 20;
          this.professionalPoint = result * 20;
          this.remProfessionalPoint = result * 20;
          break;

        case 'income' :
          this.bincome_and_property = result;
          break;
      }
    }
    this.pointReset();
  }

  pointReset() {
    this.combatList.forEach(function(skill){
      skill.jobPoint = 0;
      skill.hobbyPoint = 0;
    });
    this.searchList.forEach(function(skill){
      skill.jobPoint = 0;
      skill.hobbyPoint = 0;
    });
    this.behaviorList.forEach(function(skill){
      skill.jobPoint = 0;
      skill.hobbyPoint = 0;
    });
    this.negotiationList.forEach(function(skill){
      skill.jobPoint = 0;
      skill.hobbyPoint = 0;
    });
    this.knowledgeList.forEach(function(skill){
      skill.jobPoint = 0;
      skill.hobbyPoint = 0;
    });
  }

  // 所持品(wepon)枠の作成
  generateWeponFrame() {
    for (let i = 0; i < 5; i++) {
      let wepon = {
        name: '',
        successRate: 0,
        damage: '',
        range: '',
        attackCount: 0,
        loadingCount: 0,
        endurance: 0,
        other: ''
      } ;
      this.weponList[i] = wepon;
    }
    console.log(this.weponList);
  }

  // 所持品(item)の枠作成
  generateItemFrame() {
    for (let i = 0; i < 5; i++ ) {
      let item = {
        name: '',
        times: '',
        description: ''
      } ;
      this.itemslist[i] = item;
    }
    console.log(this.itemslist);
  }

  ngOnInit() {
  }


  download() {
    // Charaクラスを完成させる
    let newchara = new Chara();

    let newcharacter = new Character();
    newcharacter.name = this.cname;
    newcharacter.gender = this.cgender;
    newcharacter.height = this.cheight;
    newcharacter.weight = this.cweight;
    newcharacter.birthplace = this.cbirthplace;
    newcharacter.hairColor = this.chairColor;
    newcharacter.eyeColor = this.ceyeColor;

    let newsetting = new Setting();
    newsetting.type = this.stype;
    newsetting.race = this.srace;
    newsetting.job = this.sjob;
    newsetting.character = newcharacter;

    newchara.Setting = newsetting;  // charaに入れる

    let newskill = new Skill();
    this.combatList.forEach(function(skill) {
      let newbehavior = new Behavior();
      newbehavior.skillName = skill['skillName'];
      newbehavior.initialValue = skill['initialValue'];
      newbehavior.jobPoint = skill['jobPoint'];
      newbehavior.hobbyPoint = skill['hobbyPoint'];
      newbehavior.growthPoint = skill['growthPoint'];
      newbehavior.otherPoint = skill['otherPoint'];
      newskill.conbat.push(newbehavior);
    });
    this.searchList.forEach(function(skill) {
      let newbehavior = new Behavior();
      newbehavior.skillName = skill['skillName'];
      newbehavior.initialValue = skill['initialValue'];
      newbehavior.jobPoint = skill['jobPoint'];
      newbehavior.hobbyPoint = skill['hobbyPoint'];
      newbehavior.growthPoint = skill['growthPoint'];
      newbehavior.otherPoint = skill['otherPoint'];
      newskill.search.push(newbehavior);
    });
    this.behaviorList.forEach(function(skill) {
      let newbehavior = new Behavior();
      newbehavior.skillName = skill['skillName'];
      newbehavior.initialValue = skill['initialValue'];
      newbehavior.jobPoint = skill['jobPoint'];
      newbehavior.hobbyPoint = skill['hobbyPoint'];
      newbehavior.growthPoint = skill['growthPoint'];
      newbehavior.otherPoint = skill['otherPoint'];
      newskill.behavior.push(newbehavior);
    });
    this.negotiationList.forEach(function(skill) {
      let newbehavior = new Behavior();
      newbehavior.skillName = skill['skillName'];
      newbehavior.initialValue = skill['initialValue'];
      newbehavior.jobPoint = skill['jobPoint'];
      newbehavior.hobbyPoint = skill['hobbyPoint'];
      newbehavior.growthPoint = skill['growthPoint'];
      newbehavior.otherPoint = skill['otherPoint'];
      newskill.negotiation.push(newbehavior);
    });
    this.knowledgeList.forEach(function(skill) {
      let newbehavior = new Behavior();
      newbehavior.skillName = skill['skillName'];
      newbehavior.initialValue = skill['initialValue'];
      newbehavior.jobPoint = skill['jobPoint'];
      newbehavior.hobbyPoint = skill['hobbyPoint'];
      newbehavior.growthPoint = skill['growthPoint'];
      newbehavior.otherPoint = skill['otherPoint'];
      newskill.knowledge.push(newbehavior);
    });

    newchara.Skill = newskill;  // charaに入れる

    let newstatus = new Status();
    let newbaseStatus = new BaseStatus();
    newbaseStatus.str = this.bstr;
    newbaseStatus.con = this.bcon;
    newbaseStatus.pow = this.bpow;
    newbaseStatus.dex = this.bdex;
    newbaseStatus.siz = this.bsiz;
    newbaseStatus.app = this.bapp;
    newbaseStatus.int = this.bint;
    newbaseStatus.edu = this.bedu;
    newbaseStatus.income_and_property = this.bincome_and_property;
    newstatus.baseStatus = newbaseStatus;

    let newfluctuationStatus = new FluctuationStatus();
    newfluctuationStatus.san = this.fsan;
    newfluctuationStatus.luck = this.fluck;
    newfluctuationStatus.idea = this.fidea;
    newfluctuationStatus.knowledge = this.fknowledge;
    newfluctuationStatus.health = this.fhealth;
    newfluctuationStatus.mp = this.fmp;
    newfluctuationStatus.VocationalSkill = this.fVocationalSkill;
    newfluctuationStatus.HobbySkill = this.fHobbySkill;
    newfluctuationStatus.DamegeBonus = this.fDamegeBonus;
    newstatus.fluctuationStatus = newfluctuationStatus;

    newchara.Status = newstatus;  // charaに入れる

    let newitems = new Items();
    this.weponList.forEach(function(item) {
      if ( item.name ) {
        let newwepon = new Weapon();
        newwepon.weaponName = item.name;
        newwepon.successRate = item.successRate;
        newwepon.damage = item.damage;
        newwepon.range = item.range;
        newwepon.attackCount = item.attackCount;
        newwepon.loadingCount = item.loadingCount;
        newwepon.endurance = item.endurance;
        newwepon.other = item.other;
        newitems.weapon.push(newwepon);
      }
    });
    this.itemslist.forEach(function(item) {
      if ( item.name ) {
        let newitem = new Item();
        newitem.itemName = item.name;
        newitem.number = item.times;
        newitem.other = item.description;
        newitems.item.push(newitem);
      }
    });
    newchara.items = newitems;  // charaに入れる
    let newprofile = new Profile();
    newprofile.Career = this.pCareer;
    newprofile.Encounter = this.pEncounter;
    newprofile.otherMemo = this.pOtherMemo;
    newchara.profile = newprofile;  // charaに入れる

    let characterJson = Convert.charaToJson(newchara);  // CharaクラスをJSONに変換する

    this.characre.save(characterJson, document.getElementById('download'), this.filename);  // JSON文字列を保存させる
  }
}
