//キャラクターを作成する処理
//作成画面をhymlで
//基本フロー3,6,9の処理

//3,アクターは作成するキャラクターPCかNPCかを選択する。
function judge(acter){
  if(acter=="PC") {

  }else　if(acter=="NPC"){

  }
}

//6,システムはダイスロールの値からをステータスを決める。
function Diceroll(){
  let diceroll = Math.floor(Math.random() * 11);
  return diceroll;
}

//9,システムは情報をjson形式で管理用フォルダに保存する。

//jsonに変換
function Save(data) {
  let target = data.target;
  let file = target.files;
  let jsondata = JSON.stringify(file);
  console.log(file);
}

//ファイルのダウンロード（保存）
function handleDownload(content, filename) {
    var blob = new Blob([ content ], { "type" : "text/plain" });

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);

        // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
}

let file = document.getElementById('file');
file.addEventListener('change',Save);
