import {Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { CharacterManagementService } from '../../Service/character-management.service';
import { Convert, Chara ,Item} from '../../model/character-info-model';

@Component({
  selector: 'app-character-management',
  templateUrl: './character-management.component.html',
  styleUrls: ['./character-management.component.css']
})
export class CharacterManagementComponent implements OnInit {

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

  private age = '不詳' ; // jsonに要素がない！？

  // 技能
  private conbat;
  private search;
  private behavior;
  private negotiation;
  private knowledgeskill;

  // 所持品
  private weapons;
  private items;

  // 経歴
  private career;
  private encounter;
  private othermemo;

private table:HTMLElement;

@ViewChild('conbat')
private el: ElementRef;

  constructor(private charamana: CharacterManagementService,private renderer: Renderer2

  ) {
  }




  ngOnInit() {
    let textarea = this.renderer.createElement('textarea');

    /*
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      alert('未');
    } else {
      alert('未対応');
    }

    */

  }

  getJson(list: any) {

    if (list <= 0) { return; } // 何も指定されていなければ何もしない

    let fileobj = list[0];  // 指定されるファイルは1つのみなので[0]
    let reader = new FileReader();

    reader.onload = function() {  // readAsTextでファイルの読み込みが終わったら呼び出される
      // console.log(reader.result);
//      CharacterjsonToHtmlComponent.prototype.pushJson(reader.result);  // ファイルの内容を各値に入れていく
      CharacterManagementComponent.prototype.pushHTML(reader.result);  // ファイルの内容を各値に入れていく

    };
    reader.readAsText(fileobj);  // ファイルの内容をtextで読む (reader.onloadのreader.resultがstringになるへ)
  }

  pushHTML(str) {
    let chara: Chara = Convert.toChara(str);
    console.log(chara);


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

    this.vocationalskill = chara.Status.fluctuationStatus.VocationalSkill;
    this.hobbyskill = chara.Status.fluctuationStatus.HobbySkill;
    this.incomeproperty = chara.Status.baseStatus.income_and_property;

    // プロフィール
    // Setting
    this.name = chara.Setting.character.name;
    this.job = chara.Setting.job;
    this.gender = chara.Setting.character.gender;
    this.height = chara.Setting.character.height;
    this.weight = chara.Setting.character.weight;
    this.birthplace = chara.Setting.character.birthplace;
    this.haircolor = chara.Setting.character.hairColor;
    this.eyecolor = chara.Setting.character.eyeColor;

    // this.age = chara.Setting

    let split = ',';
/*
    // 技能
    // 戦闘技能
    // Skill.conbat
    this.conbat = '';
    let conbat_len = Object.keys(chara.Skill.conbat).length;
    for(let i = 0 ; i < conbat_len ; i++) {
      this.conbat +=
        '技能名:'+ chara.Skill.conbat[i].skillName + split +
        '初期値:'+ chara.Skill.conbat[i].initialValue + split +
        '職業P:' + chara.Skill.conbat[i].jobPoint + split +
        '興味P:' + chara.Skill.conbat[i].hobbyPoint + split +
        '成長P:' + chara.Skill.conbat[i].growthPoint + split +
        'その他:' + chara.Skill.conbat[i].otherPoint  + '\n';
    }
  
    // 探索技能
    // Skill.search
    this.search = '';
    let search_len = Object.keys(chara.Skill.search).length;
    for(let i = 0 ; i < search_len ; i++) {
      this.search +=
        '技能名:'+ chara.Skill.search[i].skillName + split +
        '初期値:'+ chara.Skill.search[i].initialValue + split +
        '職業P:' + chara.Skill.search[i].jobPoint + split +
        '興味P:' + chara.Skill.search[i].hobbyPoint + split +
        '成長P:' + chara.Skill.search[i].growthPoint + split +
        'その他:' + chara.Skill.search[i].otherPoint  + '\n';
    }

    // 行動技能
    // Skill.behavior
    this.behavior = '';
    let behavior_len = Object.keys(chara.Skill.behavior).length;
    for(let i = 0 ; i < behavior_len ; i++) {
      this.behavior +=
        '技能名:'+ chara.Skill.behavior[i].skillName + split +
        '初期値:'+ chara.Skill.behavior[i].initialValue + split +
        '職業P:' + chara.Skill.behavior[i].jobPoint + split +
        '興味P:' + chara.Skill.behavior[i].hobbyPoint + split +
        '成長P:' + chara.Skill.behavior[i].growthPoint + split +
        'その他:' + chara.Skill.behavior[i].otherPoint  + '\n';
    }

    // 交渉技能
    // Skill.negotiation
    this.negotiation = '';
    let negotiation_len = Object.keys(chara.Skill.negotiation).length;
    for(let i = 0 ; i < negotiation_len ; i++) {
      this.negotiation +=
        '技能名:'+ chara.Skill.negotiation[i].skillName + split +
        '初期値:'+ chara.Skill.negotiation[i].initialValue + split +
        '職業P:' + chara.Skill.negotiation[i].jobPoint + split +
        '興味P:' + chara.Skill.negotiation[i].hobbyPoint + split +
        '成長P:' + chara.Skill.negotiation[i].growthPoint + split +
        'その他:' + chara.Skill.negotiation[i].otherPoint  + '\n';
    }

    // 知識技能
    // Skill.knowledge
    this.knowledgeskill = '';
    let knowledgeskill_len = Object.keys(chara.Skill.knowledge).length;
    for(let i = 0 ; i < knowledgeskill_len ; i++) {
      this.knowledgeskill +=
        '技能名:'+ chara.Skill.knowledge[i].skillName + split +
        '初期値:'+ chara.Skill.knowledge[i].initialValue + split +
        '職業P:' + chara.Skill.knowledge[i].jobPoint + split +
        '興味P:' + chara.Skill.knowledge[i].hobbyPoint + split +
        '成長P:' + chara.Skill.knowledge[i].growthPoint + split +
        'その他:' + chara.Skill.knowledge[i].otherPoint  + '\n';
    }

*/
    // 所持品
    // 戦闘・武器・防具
    this.weapons = '';
    let weapon_len = Object.keys(chara.items.weapon).length;
    for(let i = 0 ; i < weapon_len ; i++) {
      this.weapons +=
        '名称:'+ chara.items.weapon[i].weaponName + split +
        '成功率:'+ chara.items.weapon[i].successRate + split +
        'ダメージ:' + chara.items.weapon[i].damage + split +
        '射程:' + chara.items.weapon[i].range + split +
        '攻撃回数:' + chara.items.weapon[i].attackCount + split +
        '装填数:' + chara.items.weapon[i].loadingCount + split +
        '耐久力:' + chara.items.weapon[i].endurance + split +
        'その他:' + chara.items.weapon[i].other + '\n';
    }

      // 所持品
    this.items = '';
    let items_len = Object.keys(chara.items.item).length;
    for(let i = 0 ; i < items_len ; i++) {
      this.items +=
        '名称:'+ chara.items.item[i].itemName + split +
        '個数:'+ chara.items.item[i].number + split +
        '説明:' + chara.items.item[i].other + '\n' ;
    }
    /*
    let table = document.getElementById('items');
    console.log(table);
    let tr = this.renderer.createElement('tr');
    let td1 = this.renderer.createElement('td');
    let td2 = this.renderer.createElement('td');
    let td3 = this.renderer.createElement('td');

    document.getElementById('items').appendChild(tr);
    tr.appendChild(td1);
    td1.innerHTML = 'item1';
    tr.appendChild(td2);
    td2.innerHTML = '5';
    tr.appendChild(td3);
    td3.innerHTML = 'good';
*/
     /* for(let i = 0 ; i < item_len ; i ++) {
      td1.innerText = chara.items.item[i].itemName;
      td2.innerText = chara.items.item[i].number;
      td3.innerText = chara.items.weapon[i].other;
*/
    // 経歴
    this.career = chara.profile.Career;
    this.encounter = chara.profile.Encounter;
    this.othermemo = chara.profile.otherMemo;

    }

}

/*
<tr>
                  <td>所持品01</td>
                  <td>1</td>
                  <td><p>説明テキスト</p></td>
                </tr>
 */
/*
  onChange(evt) {
    const file = evt.target.files[0];
    this.fileToText(file)
      .then(text => {
        console.log
      })
      .catch(err => console.log(err));
  }

  fileToText(file): Promise<string> {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        // @ts-ignore
        resolve(reader.result);
        console.log('onload');
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });
  }




  test(a) {
    console.log(a.root.getFile('character-create.component.html', {create: true, exclusive: true}));
  }


}
*/
