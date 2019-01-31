// characterJSONを作るのに便利になるclassたち

// 呼び出し方
// 各クラスをデフォルト値でnewしたいときは引数に0を入れてください
//
// import { Convert, Chara, Setting, Character, Skill,
//       Behavior, Status, BaseStatus, FluctuationStatus,
//       Items, Item, Weapon, Profile } from "./character-info-model";  // fromには、このファイルの場所を指定する
//
// // const chara = Convert.toChara(json);  // 謎
//
// // 各クラスのnewするテンプレート
// let chara = new Chara(0);
// let setting = new Setting(0);
// let character = new Character(0);
// let skill = new Skill(0);
// let behavior = new Behavior(0);  // スキルの数だけ存在する
// let status = new Status(0);
// let baseStatus = new BaseStatus(0);
// let fluctuationStatus = new FluctuationStatus(0);
// let items = new Items(0);
// let item = new Item(0);  // 持ってるアイテムの数だけ存在する
// let weapon = new Weapon(0);  // 持ってる武器の数だけ存在する
// let profile = new Profile(0);
//

export class Chara {
    Setting: Setting;
    Status:  Status;
    Skill:   Skill;
    items:   Items;
    profile: Profile;

    constructor(infoObject) {
        if (infoObject !== 0) {
            this.Setting = new Setting(infoObject['Setting']);
            this.Status = new Status(infoObject['Status']);
            this.Skill = new Skill(infoObject['Skill']);
            this.items = new Items(infoObject['items']);
            this.profile = new Profile(infoObject['profile']);
        }
    }
}

export class Setting {
    type:      string = '';  // PCかNPCか
    race:      string = '';  // 種族
    character: Character;
    job:       string = '';  // 職業
    images:    any[] = [];

    constructor(infoObject) {
        if (infoObject !== 0) {
            this.type = infoObject['type'];
            this.race = infoObject['race'];
            this.character = new Character(infoObject['character']);
            this.job = infoObject['job'];
            // this.images = infoObject['images']; //　画像は未実装
        }
    }
}

export class Character {
    name:       string = '';  // 名前
    gender:     string = '';  // 性別
    height:     string = '';  // 身長
    weight:     string = '';  // 体重
    birthplace: string = '';  // 出身地
    hairColor:  string = '';  // 髪の色
    eyeColor:   string = '';  // 瞳の色

    constructor(infoObject) {
        if (infoObject !== 0) {
            this.name = infoObject['name'];
            this.gender = infoObject['gender'];
            this.height = infoObject['height'];
            this.weight = infoObject['weight'];
            this.birthplace = infoObject['birthplace'];
            this.hairColor = infoObject['hairColor'];
            this.eyeColor = infoObject['eyeColor'];
        }
    }
}

export class Skill {
    conbat:      Behavior[] = [];
    search:      Behavior[] = [];
    behavior:    Behavior[] = [];
    negotiation: Behavior[] = [];
    knowledge:   Behavior[] = [];

    constructor (infoObject) {
        if (infoObject !== 0) {
            infoObject['conbat'].forEach((skill) => this.conbat.push(new Behavior(skill)));
            infoObject['search'].forEach((skill) => this.search.push(new Behavior(skill)));
            infoObject['behavior'].forEach((skill) => this.behavior.push(new Behavior(skill)));
            infoObject['negotiation'].forEach((skill) => this.negotiation.push(new Behavior(skill)));
            infoObject['knowledge'].forEach((skill) => this.knowledge.push(new Behavior(skill)));
        }
    }
}

export class Behavior {
    skillName:     string = '';  // 技能名
    initialValue: number = 0;  //  その技能の初期値
    jobPoint:      number = 0;  //  割り振った職業ポイント
    hobbyPoint:    number = 0;  //  割り振った趣味ポイント
    growthPoint:   number = 0;  //  実際に上昇した値
    otherPoint:    number = 0;  //  その他の値

    constructor (infoObject) {
        if (infoObject !== 0) {
            this.skillName = infoObject['skillName'];
            this.initialValue = infoObject['initialValue'];
            this.jobPoint = infoObject['jobPoint'];
            this.hobbyPoint = infoObject['hobbyPoint'];
            this.growthPoint = infoObject['growthPoint'];
            this.otherPoint = infoObject['otherPoint'];
       }
    }
}

export class Status {
    baseStatus:     BaseStatus;
    fluctuationStatus: FluctuationStatus;
    reDice:            BaseStatus;

    constructor (infoObject) {
        if (infoObject !== 0) {
            this.baseStatus = new BaseStatus(infoObject['baseStatus']);
            this.fluctuationStatus = new FluctuationStatus(infoObject['fluctuationStatus']);
            // this.reDice = new BaseStatus(infoObject['reDice']);
        }
    }
}

export class BaseStatus {
    str:                   number = 0;  // 筋力
    con:                   number = 0;  // 体力
    pow:                   number = 0;  // 精神力
    dex:                   number = 0;  // 俊敏性
    siz:                   number = 0;  // 体格
    app:                   number = 0;  // 外見
    int:                   number = 0;  // 知性
    edu:                   number = 0;  // 教育
    income_and_property: number = 0;  // 財産

    constructor (infoObject) {
        if (infoObject !== 0) {
            this.str = infoObject['str'];
            this.con = infoObject['con'];
            this.pow = infoObject['pow'];
            this.dex = infoObject['dex'];
            this.siz = infoObject['siz'];
            this.app = infoObject['app'];
            this.int = infoObject['int'];
            this.edu = infoObject['edu'];
            this.income_and_property = infoObject['income_and_property'];
        }
    }
}

export class FluctuationStatus {
    san:             number = 0;  // SAN値
    luck:            number = 0;  // 幸運
    idea:            number = 0;  // アイデア
    knowledge:       number = 0;  // 知識
    health:          number = 0;  // 耐久力
    mp:              number = 0;  // MP
    VocationalSkill: number = 0;  // 職業技能ポイント
    HobbySkill:      number = 0;  // 趣味技能ポイント
    DamegeBonus:     string = '';  // ダメージボーナス

    constructor (infoObject) {
        if (infoObject !== 0) {
            this.san = infoObject['san'];
            this.luck = infoObject['luck'];
            this.idea = infoObject['idea'];
            this.knowledge = infoObject['knowledge'];
            this.health = infoObject['health'];
            this.mp = infoObject['mp'];
            this.VocationalSkill = infoObject['VocationalSkill'];
            this.HobbySkill = infoObject['HobbySkill'];
            // this.DamegeBonus = infoObject['DamegeBonus'];
        }
    }
}

export class Items {
    weapon: Weapon[] = [];
    item:   Item[] = [];

    constructor (infoObject) {
        if (infoObject !== 0) {
            infoObject['weapon'].forEach((obj) => new Weapon(obj));
            infoObject['item'].forEach((obj) => new Item(obj));
        }
    }
}

export class Item {
    itemName: string = '';  // アイテム名
    number:   string = '';  // 個数
    other:    string = '';  // その他

    constructor (infoObject) {
        if (infoObject !== 0) {
            this.itemName = infoObject['itemName'];
            this.number = infoObject['number'];
            this.other = infoObject['other'];
       }
    }
}

export class Weapon {
    weaponName:   string = '';  // 武器の名
    successRate:  number = 0;  // 成功確率
    damage:       string = '';  // ダメージ
    range:        string = '';  // 射程
    attackCount:  number = 0;  // 攻撃回数
    loadingCount: number = 0;  // 装弾数
    endurance:    number = 0;  // 耐久値
    other:        string = '';  // その他

    constructor (infoObject) {
        if (infoObject !== 0) {
            this.weaponName = infoObject['weaponName'];
            this.successRate = infoObject['successRate'];
            this.damage = infoObject['damege'];
            this.range = infoObject['range'];
            this.attackCount = infoObject['attackCount'];
            this.loadingCount = infoObject['loadingCount'];
            this.endurance = infoObject['endurance'];
            this.other = infoObject['other'];
        }
    }
}

export class Profile {
    Career:    string = '';  // 経歴
    Encounter: string = '';  // 遭遇したもの
    otherMemo: string = '';  // その他メモ

    constructor (infoObject) {
        if (infoObject !== 0) {
            this.Career = infoObject['Carrer'];
            this.Encounter = infoObject['Encounter'];
            this.otherMemo = infoObject['otherMemo'];
        }
    }
}

// Converts JSON strings to/from your types
export namespace Convert {
    export function toChara(json: string): Chara {  // JSONをCharaに
        let charaJson = JSON.parse(json);
        return new Chara(charaJson);
    }

    export function charaToJson(value: Chara): string {  // Charaをstringに
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
