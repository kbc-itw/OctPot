import { Injectable } from '@angular/core';
@Injectable()
export class ChatRoomCreateService {
  /*

// S02. HTTPサーバを生成する
var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end(fs.readFileSync(__dirname + '/resources/app/chatBlock2.html', 'utf-8'));
});  // ポート競合の場合は値を変更

// S03. HTTPサーバにソケットをひも付ける（WebSocket有効化）
var io = socket.listen(server);
server.listen(3000);
// S04. connectionイベント・データを受信する
io.on('connection', function(socket) {
  console.log('aaa');
  var name;
  // S05. client_to_serverイベント・データを受信する
  socket.on('client_to_server', function(data) {
    console.log('bbb');
    // S06. server_to_clientイベント・データを送信する
    io.sockets.emit('server_to_client', {value : data.value});
  });
  // S07. client_to_server_broadcastイベント・データを受信し、送信元以外に送信する
  socket.on('client_to_server_broadcast', function(data) {
    console.log('ccc');
    socket.broadcast.emit('server_to_client', {value : data.value});
  });
  // S08. client_to_server_personalイベント・データを受信し、送信元のみに送信する
  socket.on('client_to_server_personal', function(data) {
    console.log('ddd');
    var id = socket.id;
    name = data.value;
    var personalMessage = 'あなたは、' + name + 'さんとして入室しました。';
    io.to(id).emit('server_to_client', {value : personalMessage});
  });
  // S09. disconnectイベントを受信し、退出メッセージを送信する
  socket.on('disconnect', function() {
    console.log('eee');
    if (name === 'undefined') {
      console.log('未入室のまま、どこかへ去っていきました。');
    } else {
      var endMessage = name + 'さんが退出しました。';
      io.sockets.emit('server_to_client', {value : endMessage});
      console.log('lll');
    }
  });

  socket.on('test', function() {
    console.log('test');
  });

});
  */
}
