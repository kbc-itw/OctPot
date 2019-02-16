import {Component, OnInit, Renderer2, ViewChild, ElementRef} from '@angular/core';
import { CharacterManagementService } from '../../Service/character-management.service';
import { Convert, Chara } from '../../model/character-info-model';
import { CharacterSelectedService} from '../../Service/character-selected.service';

@Component({
  selector: 'app-character-management',
  templateUrl: './character-management.component.html',
  styleUrls: ['./character-management.component.css']
})
export class CharacterManagementComponent implements OnInit {

  private PC;
  private NPC;

  // 能力値
  private str;
  private con;
  private pow;
  private dex;
  private app;
  private siz;
  private int;
  private edu;

  private san;
  private luck;
  private idea;
  private knowledge;
  private health;
  private mp;
  private damegeBonus;

  private vocationalskill;
  private hobbyskill;
  private incomeproperty;

  // プロフィール
  private name;
  private job;
  private gender;
  private height;
  private weight;
  private birthplace;
  private haircolor;
  private eyecolor;

  private age;

  // 技能
  private combats;
  private searchs;
  private behaviors;
  private negotiations;
  private knowledges;

  // 所持品
  private weapons;
  private items;

  // 経歴
  private career;
  private encounter;
  private othermemo;

  private current;

  @ViewChild('PC') el: ElementRef;


  constructor(private renderer: Renderer2,
              private service: CharacterManagementService,
              private characterSelected: CharacterSelectedService
  ) {
  }

  ngOnInit() {

    this.setData(); // ページ読み込み時にキャラクター取得

  }



  PC_click(event) {

    if (this.current !== undefined) {
      this.renderer.removeClass(this.current, 'current');
    }
    this.renderer.addClass(event.target, 'current');
    this.current = event.target;

    let index = event.target.dataset.index;

    let pls = JSON.parse(localStorage.getItem('PC'));
    let plist = [];
    for (let i = 0; i < pls.length; i++) {
      plist[i] = pls[i];
    }
    this.pushHTML(JSON.stringify(pls[index]), false);
    this.characterSelected.selectedIndex = index;
    this.characterSelected.selectedType = 'PC';
  }

  NPC_click(event) {

    if (this.current !== undefined) {
      this.renderer.removeClass(this.current, 'current');
    }
    this.renderer.addClass(event.target, 'current');
    this.current = event.target;

    let index = event.target.dataset.index;

    let nls = JSON.parse(localStorage.getItem('NPC'));
    let nlist = [];
    for (let i = 0; i < nls.length; i++) {
      nlist[i] = nls[i];
    }
    this.pushHTML(JSON.stringify(nls[index]), false);
    this.characterSelected.selectedIndex = index;
    this.characterSelected.selectedType = 'NPC';

  }

  setData() {

    this.PC = this.service.getItem('PC');
    this.NPC = this.service.getItem( 'NPC' );

  }

  onDrop(event) { // ドラッグアンドドロップでのキャラクター追加
    console.log('on drop');
    event.preventDefault();
    let file = event.dataTransfer.files;
    this.getJson(file);
  }

  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  delete() {
    let key = this.current.parentNode.id;
    let index = this.current.dataset.index;
    this.service.delete(key, index);
    this.setData();
  }

  getJson(list: File[]) {

    let fileobj = list[0];  // 指定されるファイルは1つのみなので[0]
    let reader = new FileReader();
    reader.onload = () => {  // readAsTextでファイルの読み込みが終わったら呼び出される
      // CharacterjsonToHtmlComponent.prototype.pushJson(reader.result);  // ファイルの内容を各値に入れていく
      // CharacterManagementComponent.prototype.pushHTML(reader.result);  // ファイルの内容を各値に入れていく
      this.pushHTML(reader.result);
    };
    reader.readAsText(fileobj);  // ファイルの内容をtextで読む (reader.onloadのreader.resultがstringになるへ)
  }

  pushHTML(str, bool: boolean = true) {
    let chara: Chara = Convert.toChara(str);
    // console.log(chara);
    if (bool) { // ファイルがアップロードされた場合
      if (chara.Setting.type === 'PC') {
        this.service.setItem('PC' , chara);
      } else {
        this.service.setItem('NPC' , chara);
      }

      this.setData();

    }
    // 能力値
    // Status.baseStatus
    this.str = chara.Status.baseStatus.str;
    this.con = chara.Status.baseStatus.con;
    this.pow = chara.Status.baseStatus.pow;
    this.dex = chara.Status.baseStatus.dex;
    this.app = chara.Status.baseStatus.app;
    this.siz = chara.Status.baseStatus.siz;
    this.int = chara.Status.baseStatus.int;
    this.edu = chara.Status.baseStatus.edu;

    // Status.fluctuationStatus
    this.san = chara.Status.fluctuationStatus.san;
    this.luck = chara.Status.fluctuationStatus.luck;
    this.idea = chara.Status.fluctuationStatus.idea;
    this.knowledge = chara.Status.fluctuationStatus.knowledge;
    this.health = chara.Status.fluctuationStatus.health;
    this.mp = chara.Status.fluctuationStatus.mp;
    this.damegeBonus = chara.Status.fluctuationStatus.DamegeBonus;

    this.vocationalskill = chara.Status.fluctuationStatus.VocationalSkill;
    this.hobbyskill = chara.Status.fluctuationStatus.HobbySkill;
    this.incomeproperty = chara.Status.baseStatus.income_and_property;

    // プロフィール
    // Setting
    this.name = chara.Setting.character.name;
    this.job = chara.Setting.job;
    this.gender = chara.Setting.character.gender;
    this.age = chara.Setting.character.age;
    this.height = chara.Setting.character.height;
    this.weight = chara.Setting.character.weight;
    this.birthplace = chara.Setting.character.birthplace;
    this.haircolor = chara.Setting.character.hairColor;
    this.eyecolor = chara.Setting.character.eyeColor;

    let split = ',';

    this.combats = chara.Skill.conbat;
    this.searchs = chara.Skill.search;
    this.behaviors = chara.Skill.behavior;
    this.negotiations = chara.Skill.negotiation;
    this.knowledges = chara.Skill.knowledge;


    // 所持品
    this.items = chara.items.item;
    this.weapons = chara.items.weapon;

    // 経歴
    this.career = chara.profile.Career;
    this.encounter = chara.profile.Encounter;
    this.othermemo = chara.profile.otherMemo;

  }

}
