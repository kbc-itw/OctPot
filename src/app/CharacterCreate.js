// キャラクターを作成する処理
// 作成画面をhymlで
// 基本フロー3,6,9の処理
// 3,アクターは作成するキャラクターPCかNPCかを選択する。
var CharacterCreate = (function () {
    function CharacterCreate() {
        var _this = this;
        this.str = document.getElementById('str');
        this.con = document.getElementById('con');
        this.pow = document.getElementById('pow');
        this.dex = document.getElementById('dex');
        this.app = document.getElementById('app');
        this.siz = document.getElementById('siz');
        this.int = document.getElementById('int');
        this.edu = document.getElementById('edu');
        this.SAN = document.getElementById('SAN');
        this.luck = document.getElementById('luck');
        this.idea = document.getElementById('idea');
        this.knowledge = document.getElementById('knowledge');
        this.health = document.getElementById('health');
        this.mp = document.getElementById('mp');
        this.VocationalSkill = document.getElementById('VocationalSkill');
        this.HobbySkill = document.getElementById('HobbySkill');
        this.DamegeBonus = document.getElementById('DamegeBonus');
        this.str.addEventListener('click', function () {
            var result = _this.select('str');
        }, false);
        this.con.addEventListener('click', function () {
            _this.select('con');
        }, false);
        this.pow.addEventListener('click', function () {
            var result = _this.select('pow');
            _this.SAN.innerText = String(_this.status('SAN', result[1]));
            _this.luck.innerText = String(_this.status('luck', result[1]));
            _this.mp.innerText = String(result[1]);
        }, false);
        this.dex.addEventListener('click', function () {
            _this.select('dex');
        }, false);
        this.app.addEventListener('click', function () {
            _this.select('app');
        }, false);
        this.siz.addEventListener('click', function () {
            _this.select('siz');
        }, false);
        this.int.addEventListener('click', function () {
            var result = _this.select('int');
            _this.idea.innerText = String(_this.status('idea', result[1]));
            _this.HobbySkill.innerText = String(_this.status('HobbySkill', result[1]));
        }, false);
        this.edu.addEventListener('click', function () {
            _this.select('edu');
        }, false);
    }
    CharacterCreate.prototype.judge = function (acter) {
        if (acter === 'PC') {
        }
        else if (acter === 'NPC') {
        }
        else {
            this.errorlog(acter);
        }
    };
    // 1～6の乱数作成。それを3回繰り返したのを合計して返す。(3d6)
    // 6,システムはダイスロールの値からをステータスを決める。
    CharacterCreate.prototype.diceroll = function (select) {
        var dice = [3];
        if (select === '3D6') {
            var diceroll = void 0;
            for (var i = 0; i < 2; i++) {
                diceroll = Math.floor(Math.random() * 6 + 1);
                dice[3] += diceroll;
                dice[i] += diceroll;
            }
            return dice;
        }
        else if (select === '2D6') {
            for (var i = 0; i < 1; i++) {
                var diceroll = Math.floor(Math.random() * 6 + 1);
                dice[2] += diceroll;
                dice[i] += diceroll;
            }
            return dice;
        }
        else {
            this.errorlog(select);
            return null;
        }
    };
    // 入力されたアクションからダイスの種類を決め,ダイスを振る
    CharacterCreate.prototype.select = function (action) {
        var result = 0;
        var dice;
        switch (action) {
            case 'edu':
                result += 3;
            case 'str':
            case 'con':
            case 'pow':
            case 'dex':
            case 'app':
            case 'income-and-propety':
                dice = this.diceroll('3D6');
                result += dice[3];
                break;
            case 'siz':
            case 'int':
                dice = this.diceroll('2D6');
                result += 3;
                result += dice[2];
                break;
            default:
                this.errorlog(action);
        }
        return [dice, result];
    };
    // ダイスロールの結果からステータスの値を求める。
    CharacterCreate.prototype.status = function (status, diceresult, diceresult2) {
        if (diceresult2 === void 0) { diceresult2 = null; }
        var result = 0;
        switch (status) {
            case 'SAN':
            case 'luck':
            case 'idea':
            case 'knowledge':
                result += diceresult * 5;
                break;
            case 'mp':
                result += diceresult;
                break;
            case 'HobbySkill':
                //   result += diceroll * 10;
                break;
            case 'VocationalSkill':
                //   result += diceroll * 20;
                break;
            case 'health':
                result += (diceresult + diceresult2) / 2;
                break;
            default:
                this.errorlog(status);
        }
        return result;
    };
    // 9,システムは情報をjson形式で管理用フォルダに保存する。
    // jsonに変換
    CharacterCreate.prototype.change = function (data) {
        // let target = data.target;
        // let file = target.files;
        var jsondata = JSON.stringify(data);
    };
    // ファイルのダウンロード（保存）
    CharacterCreate.prototype.save = function (content, filename) {
        var blob = new Blob([content], { 'type': 'text/plain' });
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else {
            // document.getElementById('download').href = window.URL.createObjectURL(blob);
        }
    };
    CharacterCreate.prototype.errorlog = function (e) {
        e.onerror = function (msg, url, line, col, error) {
            switch (e) {
                case null:
                case undefined:
                    console.log(msg + ':' + line);
                    console.log('引数が見つかりません。');
            }
        };
    };
    return CharacterCreate;
}());
window.onload = function (e) {
    var characre = new CharacterCreate();
    /*
      let action = document.getElementById('action');
      action.addEventListener('click', function () {});
    
      let file = document.getElementById('file');
      file.addEventListener('click', this.save());
      */
};
