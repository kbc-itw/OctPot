import { Component, OnInit } from '@angular/core';
import {Chara, Convert} from '../../model/character-info-model';
import {Subscription} from 'rxjs';
import {CharacterDataListService} from '../../Service/character-data-list.service';

@Component({
  selector: 'app-chara-ability',
  templateUrl: './chara-ability.component.html',
  styleUrls: ['./chara-ability.component.css']
})
export class CharaAbilityComponent implements OnInit {
  private charaSkillList: any[] = []; // 使用するキャラの現在のステータスが入ってる配列

  private charaList: Chara[] = [];  // 使用するキャラが入っている配列
  public subscription: Subscription;
  constructor( private clistService: CharacterDataListService) {}

  ngOnInit() {
    // どこかでcharacter-date-list.serviceのnext()が使われたら動きます。
    // 簡単いうと誰かが送信した値をdataで受け取れます
    this.subscription = this.clistService.sharedDataSource$.subscribe(
      data => {
        try {
          let chachacha = Convert.toChara(data);
          this.charaList.push(chachacha);
          let changedSkillList: CharaSkill[] = [];   //  初期値から変更されているスキルを入れておく
          // 各スキルリストを参照して初期値から変わっているスキルを抜き出す
          chachacha.Skill.conbat.forEach((skill) => {
            console.log(skill);
            if (skill.jobPoint !== 0 || skill.hobbyPoint !== 0 ||
              skill.growthPoint !== 0 || skill.otherPoint !== 0) {
              let skillPoint = skill.initialValue + skill.jobPoint +
                skill.hobbyPoint + skill.growthPoint + skill.otherPoint;
              changedSkillList.push( new CharaSkill(skill.skillName, skillPoint));
            }
          });
          chachacha.Skill.search.forEach((skill) => {
            if (skill.jobPoint !== 0 || skill.hobbyPoint !== 0 ||
              skill.growthPoint !== 0 || skill.otherPoint !== 0) {
              let skillPoint = skill.initialValue + skill.jobPoint +
                skill.hobbyPoint + skill.growthPoint + skill.otherPoint;
              changedSkillList.push( new CharaSkill(skill.skillName, skillPoint));
            }
          });
          chachacha.Skill.behavior.forEach((skill) => {
            if (skill.jobPoint !== 0 || skill.hobbyPoint !== 0 ||
              skill.growthPoint !== 0 || skill.otherPoint !== 0) {
              let skillPoint = skill.initialValue + skill.jobPoint +
                skill.hobbyPoint + skill.growthPoint + skill.otherPoint;
              changedSkillList.push( new CharaSkill(skill.skillName, skillPoint));
            }
          });
          chachacha.Skill.knowledge.forEach((skill) => {
            if (skill.jobPoint !== 0 || skill.hobbyPoint !== 0 ||
              skill.growthPoint !== 0 || skill.otherPoint !== 0) {
              let skillPoint = skill.initialValue + skill.jobPoint +
                skill.hobbyPoint + skill.growthPoint + skill.otherPoint;
              changedSkillList.push( new CharaSkill(skill.skillName, skillPoint));
            }
          });
          chachacha.Skill.negotiation.forEach((skill) => {
            if (skill.jobPoint !== 0 || skill.hobbyPoint !== 0 ||
              skill.growthPoint !== 0 || skill.otherPoint !== 0) {
              let skillPoint = skill.initialValue + skill.jobPoint +
                skill.hobbyPoint + skill.growthPoint + skill.otherPoint;
              changedSkillList.push( new CharaSkill(skill.skillName, skillPoint));
            }
          });
          console.log('すきるりすと' + changedSkillList);
          this.charaSkillList.push(changedSkillList);
        }catch (e) {
          console.error('送られてきたキャラデータの形式が間違っています');
        }
      }
    );
  }
}

// キャラのスキル名とスキルポイントを保持するクラス
export class CharaSkill {
  name: string = '';
  point: number = 0;
  constructor(name: string, point: number) {
    this.name = name;
    this.point = point;
  }
}
