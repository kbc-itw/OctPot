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
        let diceroll = Math.floor(Math.random() * 7);
        dice += diceroll;
      }
    return dice;
  }else if(select == "2D6") {
      for(int i = 0; i<1 i++) {
        let diceroll = Math.floor(Math.random() * 7);
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
  if(action=="str" || action=="con" || action=="pow" ||   action=="dex" ||
   action=="app" || action=="edu" || action=="income-and-propety") {
     let result = Diceroll("3D6");
     if(action == "edu") {
       result += 3;
     }
     return result;
  }
  if(action=="siz" || action=="int") {
    let result = Diceroll("2D6");
    result += 3;
    return result;
  }
}

//ダイスロールの結果からステータスの値を求める。
function Status(status, diceresult, diceresult2) {
  if(status=="san" || status=="luck") {
    let result = diceresult * 5;
    return result;
  }else if(status=="mp"){
    let result = diceresult;
    return result;
  }else if(status=="idea") {
    let result = diceresult * 5;
    return result;
  }else if(status=="HobbySkill") {
    let result = diceresult * 10;
    return result;
  }else if(status=="knowledge") {
    let result = diceresult * 5;
    return result;
  }else if(status=="VocationalSkill") {
    let result = diceresult * 20;
    return result;
  }else if(status=="health") {
    let diceresult3 = diceresult + diceresult2;
    let result = diceresult3/2;
    return result;
  }
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
