import { Injectable } from '@angular/core';
import * as client from 'socket.io-client';
@Injectable()
export class ChatRoomCreateService {
  // ホスト側が使うルーム作成クラス
  // ルームを作成、peerを作成、channelを作成
  // こっちでio.onでスタンバっといて入室者側のconnectが来たらoffer投げるようにするか
  private peer;
  private io;
  private channel;
  constructor() {}
  create(room, pass) {
    console.groupCollapsed('createFunction(service)');
    console.log('constructor', 'from', 'service');
    this.peer = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
    this.io = client.connect('http://150.95.205.204:80/' + room);
    // ここでemitしてpass送るか
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
    console.profile('connectFunction');
    this.connect();
    console.profileEnd();
    console.groupEnd();
  }
  // peer通信を始める準備
  connect() {
    console.groupCollapsed('connectFunction');
    console.log('connect service');
    console.profile('sdpFunction');
    this.sdp();
    console.profileEnd();
    this.io.on('connect', function (socket) {
      console.groupCollapsed('ioのconnect');
      console.log('clientSide', 'connect');
      console.groupEnd();
    });
    console.groupEnd();
  }
  // SDPofferが送られてきたときの処理
  sdp() {
    console.groupCollapsed('sdpFunction');
    console.log('from here socket function');
    let peer = this.peer;
    let io = this.io;
   // let answer = this.answer;
    io.on('SDP', function (e) {
      console.groupCollapsed('ioのSDP');
      console.log('clientSide', 'SDP');
      if (!e.sdp.sdp) {
        console.log('sdp.sdp is not property');
        return;
      }
      if (e.sdp.sdp !== peer.localDescription.sdp) {
        console.log('check the sdp');
        var description = new RTCSessionDescription(e.sdp);
        console.log(description);
        peer.setRemoteDescription(description, function () {
          console.log('peerDescription');
          console.log('desctype= ', description.type);
          if (description.type === 'offer') {
            console.log('sdp type is offer');
            console.log(peer);
            console.profile('answerFunction');
       //     answer(peer, io);
            console.profileEnd();
          }
        });
      }
      console.groupEnd();
    });
    // candidateを受け取る処理
    io.on('candidate', function (e) {
      console.groupCollapsed('ioのcandidate');
      if (peer.localDescription.sdp !== e.sdp) {
        console.log('candis ok');
        if (e.candidate) {
          var candidate = new RTCIceCandidate(e.candidate);
          peer.addIceCandidate(candidate);
        }
      }
      console.groupEnd();
    });
    console.groupEnd();
  }
  // sdpを送る処理
  offer() {
    console.groupCollapsed('offerFunction');
    console.log('this from offer');
    let peer = this.peer;
    let io = this.io;
    if (this.channel === undefined) {
      this.channel = this.peer.createDataChannel('my channel');
    }else {
      console.log(peer.localDescription.sdp);
    }
    this.channel.onopen = function () {
      console.log('DataChannelOpen');
    };
    this.channel.onmessage = function (event) {
      console.log('データチャネルメッセージ取得:', event.data);
    };
    this.channel.onclose = function () {
      console.log('DataChannelClose');
    };
    this.channel.onerror = function (err) {
      console.log(err);
    };
    peer.createOffer(function (offer) {
      peer.setLocalDescription(new RTCSessionDescription(offer), function () {
        console.log('clientSide', 'offer');
        io.emit('SDP', {sdp: offer});
      });
    }, function (error) {
      console.log(error);
    });
    console.groupEnd();
    return;
  }
}
