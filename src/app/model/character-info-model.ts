// characterJSONを作るのに便利になるinterfaceたち

// 呼び出し方
//
//   import { Convert, Chara } from "./character-info-model";  // fromには、このファイルの場所を指定する
//
//   const chara = Convert.toChara(json);  // 謎

export interface Chara {
    Setting: Setting;
    Status:  Status;
    Skill:   Skill;
    items:   Items;
    profile: Profile;
}

export interface Setting {
    type:      string;
    race:      string;
    character: Character;
    job:       string;
    images:    any[];
}

export interface Character {
    name:       string;
    gender:     string;
    height:     string;
    weight:     string;
    birthplace: string;
    hairColor:  string;
    eyeColor:   string;
}

export interface Skill {
    conbat:      Behavior[];
    search:      Behavior[];
    behavior:    Behavior[];
    negotiation: Behavior[];
    knowledge:   Behavior[];
}

export interface Behavior {
    skillName:     string;
    initialValue?: number;
    jobPoint:      number;
    hobbyPoint:    number;
    growthPoint:   number;
    otherPoint:    number;
}

export interface Status {
    baseStatus:     BaseStatus;
    fluctuationStatus: FluctuationStatus;
    reDice:            BaseStatus;
}

export interface BaseStatus {
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

export interface FluctuationStatus {
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

export interface Items {
    weapon: Weapon[];
    item:   Item[];
}

export interface Item {
    itemName: string;
    number:   string;
    other:    string;
}

export interface Weapon {
    weaponName:   string;
    successRate:  number;
    damage:       string;
    range:        string;
    attackCount:  number;
    loadingCount: number;
    endurance:    number;
    other:        string;
}

export interface Profile {
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

