import {Injectable} from '@angular/core';
import * as client from 'socket.io-client';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ChatRoomService {
  // hostのIPとパスワードを入力してルームに入室
  // もし、複数のIPが存在していた場合、IPの横にホスト名を表示するか。
  private message_peer;
  private file_peer;
  private io;
  private message_channel;
  private file_channel;
  private id;
  private name;
  public data;
  private bool;

  constructor() {
  }

  preparation() {
    console.groupCollapsed('constructor');
    console.log('constructor', 'from', 'service');
    this.message_peer = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
    this.file_peer = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
    this.io = client.connect('http://150.95.205.204:80/');
    this.data = new BehaviorSubject<string>(null);
    this.bool = true;

    console.profile('sdpFunction');
    this.message_sdp();
    console.profileEnd();

    console.profile('sdpFunction');
    this.file_sdp();
    console.profileEnd();

    console.profile('onicecadidate');
    this.message_cd();
    console.profileEnd();

    console.profile('onicecadidate');
    this.file_cd();
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

  message_dc() {
    this.message_peer.ondatachannel = (e) => {
      console.groupCollapsed('dcFunction');
      // e.channelにtestが格納されているのでそれを使う
      console.log('ondDataChannel');
      console.log(e);
      this.message_channel = e.channel;
      console.log(this.message_channel);
      // message_channel用のイベントハンドラ
      this.message_channel.onopen = () => {
        console.log('DataChannelOpen');
        var value: string = this.name + 'が入室しました。';
        this.message_channel.send(value);
      };
      this.message_channel.onmessage = (event) => {
        console.log('データチャネルメッセージ取得:', event.data);
        console.log(event.data);
        this.data.next(event.data);
      };
      this.message_channel.onclose = () => {
        console.log('DataChannelClose');
        if (this.bool) {
          var value: string = 'hostとの接続が切れました。';
          this.data.next(value);
          this.io.close();
          this.message_channel.close();
          this.message_channel = undefined;
          this.message_peer = undefined;
          console.log('channeldayo:  ', this.message_channel);
        }
      };
      this.message_channel.onerror = function (err) {
        console.log(err);
      };
      console.groupEnd();
    };
  }

  file_dc() {
    this.file_peer.ondatachannel = (e) => {
      console.groupCollapsed('dcFunction');
      // e.channelにtestが格納されているのでそれを使う
      console.log('ondDataChannel');
      console.log(e);
      this.file_channel = e.channel;
      console.log(this.file_channel);
      // message_channel用のイベントハンドラ
      this.file_channel.onopen = () => {
        console.log('file_channel_open');
      };
      this.file_channel.onmessage = (event) => {
      };
      this.file_channel.onclose = () => {
        console.log('DataChannelClose');
        if (this.bool) {
          this.file_channel.close();
          this.file_channel = undefined;
          this.file_peer = undefined;
          console.log('channeldayo:  ', this.file_channel);
        }
      };
      this.file_channel.onerror = function (err) {
        console.log(err);
      };
      console.groupEnd();
    };
  }

  message_cd() {
    this.message_peer.onicecandidate = (e) => {
      console.groupCollapsed('onicecadidate');
      if (e.candidate) {
        this.io.emit('candidate', {candidate: e.candidate, sdp: this.message_peer.localDescription.sdp});
      } else {
        console.log('candi  err');
        return;
      }
      console.groupEnd();
    };
  }

  file_cd() {
    this.file_peer.onicecandidate = (e) => {
      console.groupCollapsed('onicecadidate');
      if (e.candidate) {
        this.io.emit('candidate', {candidate: e.candidate, sdp: this.file_peer.localDescription.sdp});
      } else {
        console.log('candi  err');
        return;
      }
      console.groupEnd();
    };
  }

  get_io() {
    return this.io;
  }

  get_name() {
    return this.name;
  }

  get_channel() {
    return this.message_channel;
  }

  get_file_channel() {
    return this.file_channel;
  }

  enter(ip, pass, name) {
    // ここでホスト側に入室申請する。
    this.io.emit('enter', ip, pass);
    this.name = name;
  }

  // SDPofferが送られてきたときの処理
  message_sdp() {
    console.groupCollapsed('sdpFunction');
    console.log('from here socket function');
    this.io.on('SDP', (e, h) => {
      console.groupCollapsed('ioのSDP');
      console.log('clientSide', 'SDP');
      if (!e.sdp.sdp) {
        console.log('sdp.sdp is not property');
        return;
      }
      if (e.sdp.sdp !== this.message_peer.localDescription.sdp) {
        console.log('check the sdp');
        var description = new RTCSessionDescription(e.sdp);
        console.log(description);
        this.message_peer.setRemoteDescription(description, () => {
          console.log('peerDescription');
          console.log('desctype= ', description.type);
          if (description.type === 'offer') {
            console.log('sdp type is offer');
            console.log(this.message_peer);
            console.profile('answerFunction');
            this.message_answer(h);
            console.profileEnd();
          }
        });
      }
      console.groupEnd();
    });
    // candidateを受け取る処理
    this.io.on('candidate', (e) => {
      console.groupCollapsed('ioのcandidate');
      if (this.message_peer.localDescription.sdp !== e.sdp) {
        console.log('candis ok');
        if (e.candidate) {
          var candidate = new RTCIceCandidate(e.candidate);
          this.message_peer.addIceCandidate(candidate);
        }
      }
      console.groupEnd();
    });
    console.groupEnd();
  }

  // SDPofferが送られてきたときの処理
  file_sdp() {
    console.groupCollapsed('sdpFunction');
    console.log('from here socket function');
    this.io.on('File_SDP', (e, h) => {
      console.groupCollapsed('ioのSDP');
      console.log('clientSide', 'SDP');
      if (!e.sdp.sdp) {
        console.log('sdp.sdp is not property');
        return;
      }
      if (e.sdp.sdp !== this.file_peer.localDescription.sdp) {
        console.log('check the sdp');
        var description = new RTCSessionDescription(e.sdp);
        console.log(description);
        this.file_peer.setRemoteDescription(description, () => {
          console.log('peerDescription');
          console.log('desctype= ', description.type);
          if (description.type === 'offer') {
            console.log('sdp type is offer');
            console.log(this.file_peer);
            console.profile('answerFunction');
            this.file_answer(h);
            console.profileEnd();
          }
        });
      }
      console.groupEnd();
    });
    // candidateを受け取る処理
    this.io.on('candidate', (e) => {
      console.groupCollapsed('ioのcandidate');
      if (this.file_peer.localDescription.sdp !== e.sdp) {
        console.log('candis ok');
        if (e.candidate) {
          var candidate = new RTCIceCandidate(e.candidate);
          this.file_peer.addIceCandidate(candidate);
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
  message_offer() {
    console.groupCollapsed('offerFunction');
    console.log('this from offer');
    if (this.message_channel === undefined) {
      this.message_channel = this.message_peer.createDataChannel('my channel');
    } else {
      console.log(this.message_peer.localDescription.sdp);
    }
    this.message_channel.onopen = function () {
      console.log('DataChannelOpen');
    };
    this.message_channel.onmessage = function (event) {
      console.log('データチャネルメッセージ取得:', event.data);
    };
    this.message_channel.onclose = function () {
      console.log('DataChannelClose');
      console.log();
    };
    this.message_channel.onerror = function (err) {
      console.log(err);
    };
    this.message_peer.createOffer((offer) => {
      this.message_peer.setLocalDescription(new RTCSessionDescription(offer), () => {
        console.log('clientSide', 'offer');
        this.io.emit('SDP', {sdp: offer});
      });
    }, function (error) {
      console.log(error);
    });
    console.groupEnd();
    return;
  }

  file_offer() {
    console.groupCollapsed('offerFunction');
    console.log('this from offer');
    if (this.file_channel === undefined) {
      this.file_channel = this.file_peer.createDataChannel('my channel');
    } else {
      console.log(this.file_peer.localDescription.sdp);
    }
    this.file_channel.onopen = function () {
      console.log('DataChannelOpen');
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaopenfffffffffffffffffffffff');
    };
    this.file_channel.onmessage = function (event) {
      console.log('データチャネルメッセージ取得:', event.data);
    };
    this.file_channel.onclose = function () {
      console.log('DataChannelClose');
    };
    this.file_channel.onerror = function (err) {
      console.log(err);
    };
    this.file_peer.createOffer((offer) => {
      this.file_peer.setLocalDescription(new RTCSessionDescription(offer), () => {
        console.log('clientSide', 'offer');
        this.io.emit('File_SDP', {sdp: offer});
      });
    }, function (error) {
      console.log(error);
    });
    console.groupEnd();
    return;
  }

  // sdpが送られてきたときに行う処理
  message_answer(host) {
    console.groupCollapsed('answerFunction');
    console.log('clientSide', 'answer');
    this.message_peer.createAnswer((answer) => {
      console.log('from createAnswer');
      this.message_peer.setLocalDescription(new RTCSessionDescription(answer), () => {
        console.log('clientSide', 'PeerAnswerDescription');
        this.io.emit('answer', {sdp: answer}, {host: host});
      });
      console.profile('ondatachannel');
      this.message_dc();
      console.profileEnd();
    }, function (error) {
      console.log(error);
    });
    console.groupEnd();
    return;
  }

  file_answer(host) {
    console.groupCollapsed('answerFunction');
    console.log('clientSide', 'answer');
    this.file_peer.createAnswer((answer) => {
      console.log('from createAnswer');
      this.file_peer.setLocalDescription(new RTCSessionDescription(answer), () => {
        console.log('clientSide', 'PeerAnswerDescription');
        this.io.emit('file_answer', {sdp: answer}, {host: host});
      });
      console.profile('ondatachannel');
      this.file_dc();
      console.profileEnd();
    }, function (error) {
      console.log(error);
    });
    console.groupEnd();
    return;
  }

  message(e) {
    var value = this.name + ': ' + e;
    console.log(value);
    if (this.message_channel !== undefined) {// もしhostとの接続が切れていなかったら
      this.message_channel.send(value);
    }
    // this.data.next(value);
  }

  leave() {
    var value = this.name + 'が退出しました。';
    this.message_channel.send(value);
    this.bool = false;
    try {
      this.io.close();
      this.message_channel.close();
      this.file_channel.close();
      this.message_channel = undefined;
      this.file_channel = undefined;
      this.message_peer = undefined;
      this.file_peer = undefined;
    } catch (e) {
      console.log(e);
    }
    this.data.next(null);
  }
}
