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
    type:      string;  // PCかNPCか
    race:      string;  // 種族
    character: Character;
    job:       string;  // 職業
    images:    any[];
}

export class Character {
    name:       string;  // 名前
    gender:     string;  // 性別
    height:     string;  // 身長
    weight:     string;  // 体重
    birthplace: string;  // 出身地
    hairColor:  string;  // 髪の色
    eyeColor:   string;  // 瞳の色
}

export class Skill {
    conbat:      Behavior[];
    search:      Behavior[];
    behavior:    Behavior[];
    negotiation: Behavior[];
    knowledge:   Behavior[];
}

export class Behavior {
    skillName:     string;  // 技能名
    initialValue: number;  //  その技能の初期値
    jobPoint:      number;  //  割り振った職業ポイント
    hobbyPoint:    number;  //  割り振った趣味ポイント
    growthPoint:   number;  //  実際に上昇した値
    otherPoint:    number;  //  その他の値
}

export class Status {
    baseStatus:     BaseStatus;
    fluctuationStatus: FluctuationStatus;
    reDice:            BaseStatus;
}

export class BaseStatus {
    str:                   number;  // 筋力
    con:                   number;  // 体力
    pow:                   number;  // 精神力
    dex:                   number;  // 俊敏性
    siz:                   number;  // 体格
    app:                   number;  // 外見
    int:                   number;  // 知性
    edu:                   number;  // 教育
    income_and_property: number;  // 財産
}

export class FluctuationStatus {
    san:             number;  // SAN値
    luck:            number;  // 幸運
    idea:            number;  // アイデア
    knowledge:       number;  // 知識
    health:          number;  // 耐久力
    mp:              number;  // MP
    VocationalSkill: number;  // 職業技能ポイント
    HobbySkill:      number;  // 趣味技能ポイント
    DamegeBonus:     string;  // ダメージボーナス
}

export class Items {
    weapon: Weapon[];
    item:   Item[];
}

export class Item {
    itemName: string;  // アイテム名
    number:   string;  // 個数
    other:    string;  // その他
}

export class Weapon {
    weaponName:   string;  // 武器の名
    successRate:  number;  // 成功確率
    damage:       string;  // ダメージ
    range:        string;  // 射程
    attackCount:  number;  // 攻撃回数
    loadingCount: number;  // 装弾数
    endurance:    number;  // 耐久値
    other:        string;  // その他
}

export class Profile {
    Career:    string;  // 経歴
    Encounter: string;  // 遭遇したもの
    otherMemo: string;  // その他メモ
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


// クラスの関係早見表
//
// Chara ---- Setting ---- Character
//        |
//        |-- Status  ---- BaseStatus *2
//        |            |
//        |            |-- FluctuationStatus
//        |
//        |-- Skil   ----- Behavior * 5
//        |
//        |-- Items   ---- Weapon * n
//        |            |
//        |            |-- Item * n
//        |
//        |-- Profile
//
