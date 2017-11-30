// キャラクターを作成する処理
// 作成画面をhymlで
// 基本フロー3,6,9の処理
// 3,アクターは作成するキャラクターPCかNPCかを選択する。
var CharacterCreate = (function () {
    //  private dice: number[];
    function CharacterCreate() {
    }
    CharacterCreate.prototype.judge = function (acter) {
        if (acter === 'PC') {
        }
        else if (acter === 'NPC') {
        }
        else {
            errorlog(acter);
        }
    };
    // 1～6の乱数作成。それを3回繰り返したのを合計して返す。(3d6)
    // 6,システムはダイスロールの値からをステータスを決める。
    CharacterCreate.prototype.dceroll = function (select) {
        //  this.dice = [3];
        var dice;
        if (select === '3D6') {
            var diceroll = void 0;
            for (var i = 0; i < 2; i++) {
                diceroll = Math.floor(Math.random() * 6 + 1);
                this.dice[3] += diceroll;
                this.dice[i] += diceroll;
            }
            return this.dice;
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
            errorlog(select);
            return null;
        }
    };
    // 入力されたアクションからダイスの種類を決める
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
                dice = Diceroll('3D6');
                result += dice[3];
                break;
            case "siz":
            case "int":
                dice = Diceroll("2D6");
                result += 3;
                result += dice[2];
                break;
            default:
                errorlog(action);
        }
        return dice, result;
    };
    return CharacterCreate;
}());
// ダイスロールの結果からステータスの値を求める。
function status(status, diceresult, diceresult2) {
    var result = 0;
    switch (status) {
        case "luck":
        case "idea":
        case "knowledge":
            result += diceresult * 5;
            break;
        case "mp":
            result += diceresult;
            break;
        case "HobbySkill":
            result += diceroll * 10;
            break;
        case "VocationalSkill":
            result += diceroll * 20;
            break;
        case "health":
            result += (diceresult + diceresult2) / 2;
            break;
        default:
            errorlog(status);
    }
    return result;
}
// 9,システムは情報をjson形式で管理用フォルダに保存する。
// jsonに変換
function change(data) {
    //let target = data.target;
    //let file = target.files;
    var jsondata = JSON.stringify(data);
}
// ファイルのダウンロード（保存）
function save(content, filename) {
    var blob = new Blob([content], { "type": "text/plain" });
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
}
function errorlog(e) {
    e.onerror = function (msg, url, line, col, error) {
        switch (e) {
            case null:
            case undefined:
                console.log(msg + ":" + line);
                console.log("引数が見つかりません。");
        }
    };
}
var action = document.getElementById('action');
action.addEvebtListener(act);
var file = document.getElementById('file');
file.addEventListener('click', Save);
