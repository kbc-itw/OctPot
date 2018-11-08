import { Injectable } from '@angular/core';
import * as client from 'socket.io-client';
@Injectable()
export class ChatRoomCreateService {
  // ホスト側が使うルーム作成クラス
  // ルームを作成、peerを作成、channelを作成
  private peer;
  private io;
  private channel;
  constructor() {}
  create(room, pass) {
    console.groupCollapsed('constructor');
    console.log('constructor', 'from', 'service');
    this.peer = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
    this.io = client.connect('http://150.95.205.204:80/' + room);
    console.profile('ondatachannel');
    let io = this.io;
    let peer = this.peer;
    let channel = this.channel;
    peer.ondatachannel = function (e) {
      console.groupCollapsed('dcFunction');
      // e.channelにtestが格納されているのでそれを使う
      console.log('ondDataChannel');
      console.log(e);
      channel = e.channel;
      console.log(channel);
      channel.onopen = function () {
        console.log('DataChannelOpen');
      };
      channel.onmessage = function (event) {
        console.log('データチャネルメッセージ取得:', event.data);
      };
      channel.onclose = function () {
        console.log('DataChannelClose');
      };
      channel.onerror = function (err) {
        console.log(err);
      };
      channel.send('aaa');
      console.groupEnd();
    };
    console.profileEnd();
    console.profile('onicecadidate');
    peer.onicecandidate = function(e) {
      console.groupCollapsed('onicecadidate');
      if (e.candidate) {
        io.emit('candidate', {candidate: e.candidate, sdp: peer.localDescription.sdp});
      }else {
        console.log('candi  err');
        return;
      }
      console.groupEnd();
    };
    console.profileEnd();
    console.groupEnd();
  }
}
