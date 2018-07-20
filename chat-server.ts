'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  // http://localhost:63342/OctPot/ngdist/
  // __dirname + /ngdist
  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('http://localhost:8888');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

// S01. 必要なモジュールを読み込む
const http = require('http');
const socket = require('socket.io');
const express = require('express');

// 設定ファイルからポートを読み込んでポートを変化させる
const ngPORT = 8888;
const socketPORT = 3000;

var ex = express();
var ng = express();



ng.use('/', express.static('ngdist'));

var ng_server = http.createServer(ng);
ng_server.listen(ngPORT);

ex.use('/', express.static('client'));
ex.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/chatBlock.html');
});

var server = http.createServer(ex);
server.listen(socketPORT);
var io = socket.listen(server);

// This callback function is called every time a socket
// tries to connect to the server
io.on('connection', function(socket) {
  // ---- multi room ----
  socket.on('enter', function(roomname) {
    socket.join(roomname);
    console.log('id=' + socket.id + ' enter room=' + roomname);
    setRoomname(roomname);
  });
  function setRoomname(room) {
    socket.roomname = room;
  }

  function getRoomname() {
    var room = socket.roomname;
    return room;
  }

  // 送信処理
  function emitMessage(type, message) {
    // ----- multi room ----
    var roomname = getRoomname();

    if (roomname) {
      console.log('===== message broadcast to room -->' + roomname + ' ===> ' + message.date);
      // socket.broadcast.to(roomname).emit(type, message);
      // socket.to(socket.id).emit(type, message);
      io.emit(type, message);
    } else {
      console.log('===== message broadcast all' + ' ===> ' + message.value);
      socket.broadcast.emit(type, message);
    }
  }

  // When a user send a SDP message
  // broadcast to all users in the room
  socket.on('message', function(message) {
    var date = new Date();
    message.from = socket.id;
    console.log(date + 'id=' + socket.id + ' Received Message: ' + JSON.stringify(message));

    // get send target
    var target = message.sendto;
    if (target) {
      console.log('===== message emit to -->' + target);
      socket.to(target).emit('message', message);
      return;
    }
    // broadcast in room
    emitMessage('message', message);
  });


  // チャット

  // 誰かがチャットを送ってきたら他の部屋メンバーに転送する
  socket.on('mess', function(message) {
    var date = new Date();
    message.from = socket.id;
    message.date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    // 個チャ用の処理っぽいけど未実装
    var target = message.sendto;
    if (target) {
      console.log('===== あいつにおくるぜ to -->' + target);
      socket.to(target).emit('message', message);
      return;
    }

    // 送る
    emitMessage('mess', message);
  });


  // When the user hangs up
  // broadcast bye signal to all users in the room
  // 誰かが部屋を抜けたらそのメッセージを送る
  socket.on('disconnect', function() {
    // close user connection
    console.log((new Date()) + ' Peer disconnected. id=' + socket.id);

    // --- emit ----
    emitMessage('user disconnected', {id: socket.id});

    // --- leave room --
    var roomname = getRoomname();
    if (roomname) {
      socket.leave(roomname);
    }
  });

});
