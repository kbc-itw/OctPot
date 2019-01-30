import { Injectable } from '@angular/core';
import * as client from 'socket.io-client';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class MemoService {
  private peer;
  private io;
  private channel;
  private id;
  private name;
  public data;
  private bool;

  constructor() {}
  init() {
    console.groupCollapsed('constructor');
    this.peer = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
    this.io = client.connect('http://localhost');
    //this.io = client.connect('http://');
    this.data = new BehaviorSubject<string>(null);
    this.bool = true;

    console.profile('sdpFunction');
    this.sdp();
    console.profileEnd();
    console.profile('cdFunction');
    this.cd();
    console.profileEnd();

    this.io.on('connect', (socket) => {
      console.log('io on connect');

    });
    this.io.on('message', function(msg) {
      console.log('message:'+msg);
    });

    this.io.on('connected', function(data) {
      this.io.emit('login', data);
    });

    this.io.on('memo-create', function(id) {
      console.log('create:'+id);
    });

  }

    create(id){
      console.log('memo-create:memo' +id);
      this.io.emit('memo-create',id);

    }

/*
    memolog(){
    console.log('memo log', this.id );
    let time = Date.now();
    this.io.emit('log', time);
    }
*/

  sdp() {
    console.groupCollapsed('sdpFunction');
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
        console.log('description' + description);
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

  cd() {
    this.peer.onicecandidate = (e) => {
      console.groupCollapsed('onicecadidate');
      if (e.candidate) {
        this.io.emit('candidate', {candidate: e.candidate, sdp: this.peer.localDescription.sdp});
      }else {
        console.log('candi err');
        return;
      }
      console.groupEnd();
    };
  }

  offer() {
    console.groupCollapsed('offerFunction');
    console.log('this from offer');
    if (this.channel === undefined) {
      this.channel = this.peer.createDataChannel('my channel');
      console.log('create datachannel');
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
        var value: string = this.name + 'が入室しました。';
        this.channel.send(value);
      };
      this.channel.onmessage = (event) => {
        console.log('データチャネルメッセージ取得:', event.data);
        console.log(event.data);
        this.data.next(event.data);
      };
      this.channel.onclose = () => {
        console.log('DataChannelClose');
        if (this.bool) {
          var value: string = 'hostとの接続が切れました。';
          this.data.next(value);
          this.io.close();
          this.channel.close();
          this.channel = undefined;
          this.peer = undefined;
          console.log('channeldayo:  ', this.channel);
        }
      };
      this.channel.onerror = function (err) {
        console.log(err);
      };
      console.groupEnd();
    };
  }

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

}
