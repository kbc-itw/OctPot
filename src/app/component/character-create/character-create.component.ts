import { Component, OnInit } from '@angular/core';
import { CharacterCreateService } from '../../Service/character-create.service';
import { FormsModule } from '@angular/forms';
import { Convert, Chara, Setting, Character, Skill,
      Behavior, Status, BaseStatus, FluctuationStatus,
      Items, Item, Weapon, Profile } from '../../model/character-info-model';  // fromには、このファイルの場所を指定する

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


  constructor(private characre: CharacterCreateService) {}

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
  }
}
