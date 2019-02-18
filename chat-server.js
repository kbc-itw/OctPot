'use strict';
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('ready', function () {
    // http://localhost:63342/OctPot/ngdist/
    // __dirname + /ngdist
    // ブラウザ(Chromium)の起動, 初期画面のロード
    mainWindow = new BrowserWindow({ width: 960, height: 550, useContentSize: true, resizable: false, icon: __dirname + './ico_v2.png' });
    mainWindow.loadURL('http://localhost:8888');
    //mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
// S01. 必要なモジュールを読み込む
var http = require('http');
var socket = require('socket.io');
var express = require('express');
// ポート競合で落ちないためのテスト用関数
process.on('uncaughtException', function (err) {
    console.log(err);
});
// 設定ファイルからポートを読み込んでポートを変化させる
var ngPORT = 8888;
var ng = express();
ng.use('/', express.static(__dirname + '/ngdist'));
var ng_server = http.createServer(ng);
ng_server.listen(ngPORT);
