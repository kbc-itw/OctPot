import { Injectable } from '@angular/core';
import * as client from 'socket.io-client';
@Injectable()
export class ChatRoomService {
  private peer;
  private io;
  private channel;
  constructor() {
    console.groupCollapsed('constructor');
    console.log('constructor', 'from', 'service');
    this.peer = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
    this.io = client.connect('http://150.95.205.204:80');
    console.log(this.io);
    console.profile('ondatachannel');
    this.peer.ondatachannel = this.dc;
    console.profileEnd();
    console.profile('onicecadicate');
    this.peer.onicecandidate = this.cd;
    console.profileEnd();
    console.groupEnd();
  }
  // ポートが競合するので同じPCからテストすると結果がうまくいかない
  // connectおしてio.on('SDP')じゃなくて起動時から待機させるべきだろ <- これはホスト側(ルーム作成側)の処理だな
  // datachannellが開かれる条件が限られる
  // 条件はどちらかがconnect状態時に合計2回SDPofferをクリックすること
  // ondatachannelの位置の問題？ <- 確定じゃないが違うんじゃないか？
  // もしかしたらdatachannelをお互いに登録した後でsdpで接続しなければならないのかもしれない。
  // answer側を2回行なわけなければいけないか、両方２回行わなければいけない。
  // もしくはicecandidateの問題？

  // peer通信を行うための処理
  dc(e) {
    console.groupCollapsed('dcFunction');
    // e.channelにtestが格納されているのでそれを使う
    console.log('ondDataChannel');
    console.log(e);
    this.channel = e.channel;
    console.log(this.channel);
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
    this.channel.send('aaa');
    console.groupEnd();
  }
  cd(e) {
    console.groupCollapsed('onicecadicate');
    console.log('peercandi');
    console.log(this.io);
    if (!e.candidate) {
      return;
    }
    var candidate = e.candidate;
    this.io.emit('candidate', {candidate: candidate, sdp: this.peer.localDescription.sdp});
    console.groupEnd();
  }

  // SDPofferが送られてきたときの処理
  sdp() {
    console.groupCollapsed('sdpFunction');
    console.log('from here socket function');
    let peer = this.peer;
    let io = this.io;
    let answer = this.answer;
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
            answer(peer, io);
            console.profileEnd();
          }
        });
      }
      console.groupEnd();
    });
    // candidateを受け取る処理
    io.on('candidate', function (e) {
      console.groupCollapsed('ioのcandicate');
      console.log(e);
      if (peer.localDescription.sdp !== e.sdp) {
        var candidate = new RTCIceCandidate(e.candidate);
        peer.addIceCandidate(candidate);
      }
      console.groupEnd();
    });
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
  // sdpが送られてきたときに行う処理
  answer(peer, io) {
    console.groupCollapsed('answerFunction');
    console.log('clientSide', 'answer');
    peer.createAnswer(function(answer) {
      console.log('from createAnswer');
      peer.setLocalDescription(new RTCSessionDescription(answer), function() {
        console.log('clientSide', 'PeerAnswerDescription');
        io.emit('SDP', {sdp: answer});
      });
    }, function(error) {
      console.log(error);
    });
    console.groupEnd();
    return;
  }
}
