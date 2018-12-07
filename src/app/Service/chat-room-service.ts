import { Injectable } from '@angular/core';
import * as client from 'socket.io-client';
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class ChatRoomService {
  private peer;
  private io;
  private channel;
  private id;
  public data = new BehaviorSubject<string>('');
  constructor() {
    console.groupCollapsed('constructor');
    console.log('constructor', 'from', 'service');
    this.peer = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
    this.io = client.connect('http://150.95.205.204:80/');
    console.profile('sdpFunction');
    this.sdp();
    console.profileEnd();

    console.profile('onicecadidate');
    this.cd();
    console.profileEnd();

    this.io.headbeatTimeout = 5000;
    this.io.on('connect', (socket) => {
      console.groupCollapsed('ioのconnect');
      console.log('clientSide', 'connect');
      console.groupEnd();
      this.io.emit('id');
      this.io.emit('rooms');
    });
    this.io.on('id', (e) => {
      console.groupCollapsed('ioのid');
      console.log(e);
      this.id = e;
      console.groupEnd();
    });
    this.io.on('connect_timeout', (timeout) => {
      console.log('timeout');
      console.log(timeout);
    });
    console.groupEnd();
  }
  // ポートが競合するので同じPCからテストすると結果がうまくいかない
  // connectおしてio.on('SDP')じゃなくて起動時から待機させるべきだろ <- これはホスト側(ルーム作成側)の処理だな
  //

  dc() {
    this.peer.ondatachannel =  (e) => {
      console.groupCollapsed('dcFunction');
      // e.channelにtestが格納されているのでそれを使う
      console.log('ondDataChannel');
      console.log(e);
      this.channel = e.channel;
      console.log(this.channel);
      this.channel.onopen = () => {
        console.log('DataChannelOpen');
        var value: string = this.id + 'が入室しました。';
        this.channel.send(value);
      };
      this.channel.onmessage = (event) => {
        console.log('データチャネルメッセージ取得:', event.data);
        console.log(event.data);
        this.data.next(event.data);
      };
      this.channel.onclose = function () {
        console.log('DataChannelClose');
      };
      this.channel.onerror = function (err) {
        console.log(err);
      };
      console.groupEnd();
    };
  }

  cd() {
    this.peer.onicecandidate = (e) => {
      console.groupCollapsed('onicecadidate');
      if (e.candidate) {
        this.io.emit('candidate', {candidate: e.candidate, sdp: this.peer.localDescription.sdp});
      }else {
        console.log('candi  err');
        return;
      }
      console.groupEnd();
    };
  }

  getio() {
    return this.io;
  }

  enter(e) {
    // ここでホスト側に入室申請する。
    this.io.emit('enter', e);
  }
  // SDPofferが送られてきたときの処理
  sdp() {
    console.groupCollapsed('sdpFunction');
    console.log('from here socket function');
    this.io.on('SDP', (e, h) => {
      console.groupCollapsed('ioのSDP');
      console.log('clientSide', 'SDP');
      if (!e.sdp.sdp) {
        console.log('sdp.sdp is not property');
        return;
      }
      if (e.sdp.sdp !== this.peer.localDescription.sdp) {
        console.log('check the sdp');
        var description = new RTCSessionDescription(e.sdp);
        console.log(description);
        this.peer.setRemoteDescription(description, () => {
          console.log('peerDescription');
          console.log('desctype= ', description.type);
          if (description.type === 'offer') {
            console.log('sdp type is offer');
            console.log(this.peer);
            console.profile('answerFunction');
            this.answer(h);
            console.profileEnd();
          }
        });
      }
      console.groupEnd();
    });
    // candidateを受け取る処理
    this.io.on('candidate', (e) => {
      console.groupCollapsed('ioのcandidate');
      if (this.peer.localDescription.sdp !== e.sdp) {
        console.log('candis ok');
        if (e.candidate) {
          var candidate = new RTCIceCandidate(e.candidate);
          this.peer.addIceCandidate(candidate);
        }
      }
      console.groupEnd();
    });
    console.groupEnd();
  }
  // peer通信を始める準備
  connect() {
    console.groupCollapsed('connectFunction');
    console.log('connect service');
    console.groupEnd();
  }
  // sdpを送る処理
  offer() {
    console.groupCollapsed('offerFunction');
    console.log('this from offer');
    if (this.channel === undefined) {
      this.channel = this.peer.createDataChannel('my channel');
    }else {
      console.log(this.peer.localDescription.sdp);
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
    this.peer.createOffer( (offer) => {
      this.peer.setLocalDescription(new RTCSessionDescription(offer), () => {
        console.log('clientSide', 'offer');
        this.io.emit('SDP', {sdp: offer});
      });
      }, function (error) {
      console.log(error);
    });
    console.groupEnd();
    return;
  }
  // sdpが送られてきたときに行う処理
  answer(host) {
    console.groupCollapsed('answerFunction');
    console.log('clientSide', 'answer');
    this.peer.createAnswer((answer) => {
      console.log('from createAnswer');
      this.peer.setLocalDescription(new RTCSessionDescription(answer), () => {
        console.log('clientSide', 'PeerAnswerDescription');
        this.io.emit('answer', {sdp: answer}, {host: host});
      });
      console.profile('ondatachannel');
      this.dc();
      console.profileEnd();
    }, function(error) {
      console.log(error);
    });
    console.groupEnd();
    return;
  }
  message(e) {
    var value = this.id + ': ' + e;
    console.log(value);
    this.channel.send(value);
    this.data.next(value);
  }
}
