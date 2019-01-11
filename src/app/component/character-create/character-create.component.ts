import { Component, OnInit } from '@angular/core';
import { CharacterCreateService } from '../../Service/character-create.service';
import { FormsModule } from '@angular/forms';
import { Convert, Chara, Setting, Character, Skill,
      Behavior, Status, BaseStatus, FluctuationStatus,
      Items, Item, Weapon, Profile } from '../../model/character-info-model';

// import { HttpService } from '../app-http.service';

@Component({
  selector: 'app-character-create',
  templateUrl: './character-create.component.html',
  styleUrls: ['./character-create.component.css']
})
export class CharacterCreateComponent implements OnInit {
  private roll = '';
  private race = '';
  private name = '';
  private gender = '';
  private job = '';

  private str = '3D6';
  private con = '3D6';
  private pow = '3D6';
  private dex = '3D6';
  private app = '3D6';
  private siz = '2D6+6';
  private int = '2D6+6';
  private edu = '3D6+3';
  private income = '3D6';

  private SAN = 'pow*5';
  private luck = 'pow*5';
  private idea = 'int*5';
  private knowledge = 'edu*5';
  private health = '(con+size)/2';
  private mp = 'pow';
  private VocationalSkill = 'edu*20';
  private HobbySkill = 'int*10';
  private DamegeBonus = '';

  private Career = '';
  private Encounter = '';

  private strstock;
  private constock;
  private powstock;
  private dexstock;
  private appstock;
  private sizstock;
  private intstock;
  private edustock;
  private incomestock;

  private filename = 'octpot.js';


  private combats;
  private searchs;
  private behaviors;
  private negotiations;
  private knowledges;
  private wepons;
  private items;

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
  private pCareer;
  private pEncounter;
  private pOtherMemo;

  private combatList;  // 戦闘技能の配列
  private searchList; // 探索技能の配列
  private behaviorList: Behavior[]; // 行動技能の配列
  private negotiationList; // 交渉技能の配列
  private knowledgeList; // 知識技能の配列
  private weponList = []; // 所持品(武具)の配列
  private itemslist = [];  // 所持品(item)の配列

  // スキルポイント合計
  private combatPointAll = 0;
  private searchPointAll = 0;
  private behaviorPointAll = 0;
  private negotiationPointAll = 0;
  private knowledgePointAll = 0;

  constructor(private characre: CharacterCreateService) {
    this.generateCombatskillFrame();
    this.generateSearchskillFrame();
    this.generateBehaviorskillFrame();
    this.generateNegotiationskillFrame();
    this.generateKnowledgeskillFrame();
    this.generateWeponFrame();
    this.generateItemFrame();
  }

  // 戦闘技能枠の作成
  generateCombatskillFrame() {
    this.combatList = [
      {
        'skillName': '回避',
        'initialValue': 0,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': 'キック',
        'initialValue': 25,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '組付き',
        'initialValue': 25,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': 'こぶし（パンチ）',
        'initialValue': 50,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '頭突き',
        'initialValue': 10,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '投擲',
        'initialValue': 25,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': 'マーシャルアーツ',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '拳銃',
        'initialValue': 20,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': 'サブマシンガン',
        'initialValue': 15,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': 'ショットガン',
        'initialValue': 30,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': 'マシンガン',
        'initialValue': 15,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': 'ライフル',
        'initialValue': 25,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      }
    ];

  }

  // 探索技能枠の作成
  generateSearchskillFrame() {
    this.searchList = [
      {
        'skillName': '応急手当',
        'initialValue': 30,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '鍵開け',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '隠す',
        'initialValue': 15,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '隠れる',
        'initialValue': 10,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '聞き耳',
        'initialValue': 25,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '忍び歩き',
        'initialValue': 10,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '写真術',
        'initialValue': 10,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '精神分析',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '追跡',
        'initialValue': 10,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '登攀',
        'initialValue': 40,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '図書館',
        'initialValue': 25,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '目星',
        'initialValue': 25,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      }
    ];

  }

  // 行動技能の作成
  generateBehaviorskillFrame() {
    this.behaviorList = [
        {
          'skillName': '運転（）',
          'initialValue': 20,
          'jobPoint': 0,
          'hobbyPoint': 0,
          'growthPoint': 0,
          'otherPoint': 0
        },
        {
          'skillName': '機械修理',
          'initialValue': 20,
          'jobPoint': 0,
          'hobbyPoint': 0,
          'growthPoint': 0,
          'otherPoint': 0
        },
        {
          'skillName': '重機械操作',
          'initialValue': 1,
          'jobPoint': 0,
          'hobbyPoint': 0,
          'growthPoint': 0,
          'otherPoint': 0
        },
        {
          'skillName': '乗馬',
          'initialValue': 1,
          'jobPoint': 0,
          'hobbyPoint': 0,
          'growthPoint': 0,
          'otherPoint': 0
        },
        {
          'skillName': '水泳',
          'initialValue': 25,
          'jobPoint': 0,
          'hobbyPoint': 0,
          'growthPoint': 0,
          'otherPoint': 0
        },
        {
          'skillName': '製作（）',
          'initialValue': 5,
          'jobPoint': 0,
          'hobbyPoint': 0,
          'growthPoint': 0,
          'otherPoint': 0
        },
        {
          'skillName': '操縦',
          'initialValue': 1,
          'jobPoint': 0,
          'hobbyPoint': 0,
          'growthPoint': 0,
          'otherPoint': 0
        },
        {
          'skillName': '跳躍',
          'initialValue': 25,
          'jobPoint': 0,
          'hobbyPoint': 0,
          'growthPoint': 0,
          'otherPoint': 0
        },
        {
          'skillName': '電気修理',
          'initialValue': 10,
          'jobPoint': 0,
          'hobbyPoint': 0,
          'growthPoint': 0,
          'otherPoint': 0
        },
        {
          'skillName': 'ナビゲート',
          'initialValue': 10,
          'jobPoint': 0,
          'hobbyPoint': 0,
          'growthPoint': 0,
          'otherPoint': 0
        },
        {
          'skillName': '変装',
          'initialValue': 1,
          'jobPoint': 0,
          'hobbyPoint': 0,
          'growthPoint': 0,
          'otherPoint': 0
        }
      ];

  }

  // 交渉技能の作成
  generateNegotiationskillFrame() {
    this.negotiationList = [
      {
        'skillName': '言いくるめ',
        'initialValue': 5,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '信用',
        'initialValue': 15,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '説得',
        'initialValue': 15,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '値切り',
        'initialValue': 5,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '母国語（）',
        'initialValue': 20,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      }
    ];

  }

  // 知識技能の作成
  generateKnowledgeskillFrame() {
    this.knowledgeList = [
      {
        'skillName': '医学',
        'initialValue': 5,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': 'オカルト',
        'jobPoint': 5,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '化学',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': 'クトゥルフ神話',
        'initialValue': 0,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '芸術（）',
        'initialValue': 5,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '経理',
        'initialValue': 10,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '考古学',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': 'コンピューター',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '心理学',
        'initialValue': 5,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '人類学',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '生物学',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '地質学',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '電子工学',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '天文学',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '博物学',
        'initialValue': 10,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '物理学',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '法律',
        'initialValue': 5,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '薬学',
        'initialValue': 1,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      },
      {
        'skillName': '歴史',
        'initialValue': 20,
        'jobPoint': 0,
        'hobbyPoint': 0,
        'growthPoint': 0,
        'otherPoint': 0
      }
    ];

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
        descripton: ''
      } ;
      this.itemslist[i] = item;
    }
    console.log(this.itemslist);
  }

  ngOnInit() {
  }

  test(type) {
    switch (type) {
      case 'str':
        this.strstock = this.characre.select(type);
        this.str = this.strstock[1];
        break;
      case 'con':
        this.constock = this.characre.select(type);
        this.con = this.constock[1];
        if (this.siz !== '2D6+6') {
          this. health = this.characre.status('health', this.con, this.siz);
        }
        break;
      case 'pow':
        this.powstock = this.characre.select(type);
        this.pow = this.powstock[1];
        this.SAN = this.characre.status('SAN', this.pow);
        this.luck = this.characre.status('luck', this.pow);
        this.mp = this.characre.status('mp', this.pow);
        break;
      case 'dex':
        this.dexstock = this.characre.select(type);
        this.dex = this.dexstock[1];
        break;
      case 'app':
        this.appstock = this.characre.select(type);
        this.app = this.appstock[1];
        break;
      case 'siz':
        this.sizstock = this.characre.select(type);
        this.siz = this.sizstock[1];
        if (this.con !== '3D6') {
          this. health = this.characre.status('health', this.con, this.siz);
        }
        break;
      case 'int':
        this.intstock = this.characre.select(type);
        this.int = this.intstock[1];
        this.idea = this.characre.status('idea', this.int);
        this.HobbySkill = this.characre.status('HobbySkill', this.int);
        break;
      case 'edu':
        this.edustock = this.characre.select(type);
        this.edu = this.edustock[1];
        this.knowledge = this.characre.status('knowledge', this.edu);
        this.VocationalSkill = this.characre.status('VocationalSkill', this.edu);
        break;
      case 'income':
        this.incomestock = this.characre.select(type);
        this.income = this.incomestock[1];
        break;
    }
    console.log('OK');
  }

  radiochange(e) {
    console.log(e.target);
    if (e.target.name === 'charElem') {
      this.roll = e.target.value;
      console.log(e.target.value);
    }else if (e.target.name === 'gender') {
      this.gender = e.target.value;
      console.log(e.target.value);
    }
  }

  racechange(e) {
    this.race = e.target.value;
    console.log(e.target.value);
  }

  textinput(e) {
    console.log(e.target);
    if (e.target.id === 'chara-name') {
      this.name = e.target.value;
      console.log(e.target.value);
    }else if (e.target.id === 'job') {
      this.job = e.target.value;
      console.log(e.target.value);
    }else if (e.target.name === 'Career') {
      this.Career = e.target.value;
      console.log(e.target.value);
    }else if (e.target.name === 'Encounter') {
      this.Encounter = e.target.value;
      console.log(e.target.value);
    }
  }

  download() {
    let basic = [ this.roll, this.race, this.name, this.gender, this.job ];
    let status = [ this.str, this.con, this.pow, this.dex, this.app, this.siz, this.int, this.edu, this.income ];
    let fstatus = [ this.SAN, this.luck, this.idea, this.knowledge, this.health, this.mp,
      this.VocationalSkill, this.HobbySkill, this.DamegeBonus ];
    let profile = [this.Career, this.Encounter];
    let json = this.characre.change(basic, status, fstatus, profile);
    // this.characre.save(json, document.getElementById('download'), this.filename)
    console.log(this.cgender);
    console.log(this.cname);
    console.log(this.sjob);
    console.log(this.itemslist);
    console.log(this.weponList);

    let newchara = new Chara();
    let newsetting = new Setting();
    newsetting.type = this.stype;
    newsetting.race = this.srace;
    newsetting.job = this.sjob;

    let newcharacter = new Character();
    newcharacter.name = this.cname;
    newcharacter.gender = this.cgender;
    newcharacter.height = this.cheight;
    newcharacter.weight = this.cweight;
    newcharacter.birthplace = this.cbirthplace;
    newcharacter.hairColor = this.chairColor;
    newcharacter.eyeColor = this.ceyeColor;

    newsetting.character = newcharacter;

    let newskill = new Skill();
    this.behaviorList.forEach(function(beh) {
      newskill.behavior.push(beh);
    });
    let newbehavior = new Behavior();  // スキルの数だけ存在する
    let newstatus = new Status();
    let newbaseStatus = new BaseStatus();
    let newfluctuationStatus = new FluctuationStatus();
    let newitems = new Items();
    let newitem = new Item();  // 持ってるアイテムの数だけ存在する
    let newweapon = new Weapon();  // 持ってる武器の数だけ存在する
    let newprofile = new Profile();

  }
}
