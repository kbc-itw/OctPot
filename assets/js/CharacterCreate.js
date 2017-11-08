//キャラクターを作成する処理
//作成画面をhymlで
//基本フロー3,6,9の処理

//3,アクターは作成するキャラクターPCかNPCかを選択する。
function judge(acter){
  if(acter=="PC") {

  }else　if(acter=="NPC"){

  }
}
//1～6の乱数作成。それを3回繰り返したのを合計して返す。(3d6)
//6,システムはダイスロールの値からをステータスを決める。
function Diceroll(select){
    let dice = 0;
    if(select == "3D6") {
      for(int i =0; i<2 i++) {
        let diceroll = Math.floor(Math.random() * 6 + 1);
        dice += diceroll;
      }
    return dice;
  }else if(select == "2D6") {
      for(int i = 0; i<1 i++) {
        let diceroll = Math.floor(Math.random() * 6 + 1);
        dice += diceroll;
      }
      return dice;
    }else {
      console.log("error");
      return null;
    }
}

//入力されたアクションからダイスの種類を決める
function Select(action) {
  let result = 0;
  switch(action) {
    case "edu":
      result += 3;
    case "str":
    case "con":
    case "pow":
    case "dex":
    case "app":
    case "income-and-propety":
      result += diceroll("3D6");
      break;
    case "siz":
    case "int":
      result += 3;
      result += diceroll("2D6");
      break;
    default:
      console.log("error");
  }
  return result;
}

//ダイスロールの結果からステータスの値を求める。
function Status(status, diceresult, diceresult2) {
  let result = 0;
  switch(status) {
    case: "san":
    case: "luck":
    case: "idea":
    case: "knowledge"
      result += diceresult * 5;
      break;
    case: "mp":
      result += diceresult;
      break;
    case: "HobbySkill"
      result += diceroll * 10;
      break;
    case: "VocationalSkill"
      result += diceroll * 20;
      break;
    case: "health"
      result += (diceresult + diceresult2)/2:
      break;
    default:
      console.log("error");
  }
  return result;
}


//9,システムは情報をjson形式で管理用フォルダに保存する。

//jsonに変換
function Change(data) {
  let target = data.target;
  let file = target.files;
  let jsondata = JSON.stringify(file);
}

//ファイルのダウンロード（保存）
function Save(content, filename) {
    let blob = new Blob([ content ], { "type" : "text/plain" });

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
}
let file = document.getElementById('file');
file.addEventListener('click',Save)
