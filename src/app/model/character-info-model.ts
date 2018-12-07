// characterJSONを作るのに便利になるclassたち

// 呼び出し方
//
// import { Convert, Chara, Setting, Character, Skill,
//       Behavior, Status, BaseStatus, FluctuationStatus,
//       Items, Item, Weapon, Profile } from "./character-info-model";  // fromには、このファイルの場所を指定する
//
// // const chara = Convert.toChara(json);  // 謎
//
// // 各クラスのnewするテンプレート
// let chara = new Chara();
// let setting = new Setting();
// let character = new Character();
// let skill = new Skill();
// let behavior = new Behavior();  // スキルの数だけ存在する
// let status = new Status();
// let baseStatus = new BaseStatus();
// let fluctuationStatus = new FluctuationStatus();
// let items = new Items();
// let item = new Item();  // 持ってるアイテムの数だけ存在する
// let weapon = new Weapon();  // 持ってる武器の数だけ存在する
// let profile = new Profile();
//

export class Chara {
    Setting: Setting;
    Status:  Status;
    Skill:   Skill;
    items:   Items;
    profile: Profile;
}

export class Setting {
    type:      string;
    race:      string;
    character: Character;
    job:       string;
    images:    any[];
}

export class Character {
    name:       string;
    gender:     string;
    height:     string;
    weight:     string;
    birthplace: string;
    hairColor:  string;
    eyeColor:   string;
}

export class Skill {
    conbat:      Behavior[];
    search:      Behavior[];
    behavior:    Behavior[];
    negotiation: Behavior[];
    knowledge:   Behavior[];
}

export class Behavior {
    skillName:     string;
    initialValue?: number;
    jobPoint:      number;
    hobbyPoint:    number;
    growthPoint:   number;
    otherPoint:    number;
}

export class Status {
    baseStatus:     BaseStatus;
    fluctuationStatus: FluctuationStatus;
    reDice:            BaseStatus;
}

export class BaseStatus {
    str:                   number;
    con:                   number;
    pow:                   number;
    dex:                   number;
    siz:                   number;
    app:                   number;
    int:                   number;
    edu:                   number;
    income_and_property: number;
}

export class FluctuationStatus {
    san:             number;
    luck:            number;
    idea:            number;
    knowledge:       number;
    health:          number;
    mp:              number;
    VocationalSkill: number;
    HobbySkill:      number;
    DamegeBonus:     string;
}

export class Items {
    weapon: Weapon[];
    item:   Item[];
}

export class Item {
    itemName: string;
    number:   string;
    other:    string;
}

export class Weapon {
    weaponName:   string;
    successRate:  number;
    damage:       string;
    range:        string;
    attackCount:  number;
    loadingCount: number;
    endurance:    number;
    other:        string;
}

export class Profile {
    Career:    string;
    Encounter: string;
    otherMemo: string;
}

// Converts JSON strings to/from your types
export namespace Convert {
    export function toChara(json: string): Chara {
        return JSON.parse(json);
    }

    export function charaToJson(value: Chara): string {
        return JSON.stringify(value);
    }
}

