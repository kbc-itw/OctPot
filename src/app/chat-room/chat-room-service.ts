import { Injectable } from '@angular/core';
import * as client from 'socket.io-client';
@Injectable()
export class ChatRoomService {
  private peer;
  private io;
  private a;
  constructor() {
    console.log('constructor', 'from', 'service');
  }
  /*
ポートが競合するので同じPCからテストすると結果がうまくいかない
具体的には競合によるerrorを無視して実行しているので同じアプリが起動し、同じインスタンスやプロパティを持つことで2者間通信の再現性が損なわれる。
   */
  sdp() {
   // ChatRoomService.channel = ChatRoomService.peer.ondatachannel('test');
    console.log('from here socket function');
    // SDPofferが送られてきたときの処理
    let peer = this.peer;
    let io = this.io;
    let a = this.a;
    io.on('SDP', function(e) {
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
          console.log(description.type);
          if (description.type === 'offer') {
            console.log('sdp type is offer');
             // this.answer();
          }
        });
      }
    });
    /*
    io.on('candidate', function(e){
      console.log('iocandi');
      console.log(e);
      if (peer.localDescription.sdp !== e.sdp) {
        var candidate = new RTCIceCandidate(e.candidate);
        peer.addIceCandidate(candidate);
      }
    });
    */
  }
  connect() {
    this.peer = new RTCPeerConnection({iceServers: [{ urls: 'stun:stun.l.google.com:19302'}]});
    this.a = new RTCPeerConnection({iceServers: [{ urls: 'stun:stun.l.google.com:19302'}]});
    this.io = client.connect('http://150.95.205.204:80');
    console.log('connect service');
   // let peer = this.peer;
    let io = this.io;
    let sdp = this.sdp();
    let offer = this.offer();
    io.on('connect', function (socket) {
      console.log('clientSide', 'connect');
      /*
      peer.addEventListener('icecandidate', function (e) {
        console.log('peercandi');
        if (!e.candidate) {
          return;
        }
        var candidate = e.candidate;
        io.emit('candidate', {candidate: candidate, sdp: peer.localDescription.sdp});
      });
      */
      sdp;
      offer;
    });
  }
  offer() {
    console.log('this from offer');
    let peer = this.peer;
    let a = this.a;
    let io = this.io;
    // this.channel = this.peer.createDataChannel('test');
    peer.createOffer(function(offer) {
      peer.setLocalDescription(new RTCSessionDescription(offer), function() {
        console.log('clientSide', 'offer');
        io.emit('SDP', {sdp: offer});
      });
    }, function(error) {
      console.log(error);
    });
    /*
    a.createOffer(function(offer) {
      a.setLocalDescription(new RTCPeerConnection(offer), function() {
        console.log('this.a offer');
        io.emit('SDP', {sdp: offer});
      });
    }, function (error) {
      console.log(error);
    });
    */
    return;
  }
  answer() {
    console.log('clientSide', 'answer');
    this.peer.createAnswer(function(answer) {
      this.peer.setLocalDescription(new RTCSessionDescription(answer), function() {
        console.log('clientSide', 'answer');
        client.emit('SDP', {sdp: answer});
      });

      // DataChannelの接続を監視
      this.peer.ondatachannel = function(e) {
        // e.channelにtestが格納されているのでそれを使う
        console.log('ondDataChannel');
        this.channel = e.channel;
      };

    }, function(error) {
      console.log(error);
    });
    return;
  }
}
/*
ChatRoomService.channel.onopen = function() {
  console.log('DataChannelOpen');
};
ChatRoomService.channel.onmessage = function (event) {
  console.log('データチャネルメッセージ取得:', event.data);
};
*/
  /*
  io.on('connect', function(socket) {
    console.log('clientSide', 'connect');

    io.on('SDP', function(e) {
      console.log(e.sdp.type);
      console.log(this.peer.localDescription.sdp);
      if (true) { // ここでoffer側がremoteに自身をsetしないようにしたい
        console.log('mysdp:', this.peer.localDescription.sdp);
        console.log('partnersdp:', this.peer.remoteDescription.sdp);
        if (!e.sdp.sdp) {
          return;
        }

        var description = new RTCSessionDescription(e.sdp);
        this.peer.setRemoteDescription(description, function () {
          console.log(description.type);
          if (description.type === 'offer') {
            //     answer();
          }
        });
      }
    });

    io.on('candidate', function(e){
      console.log(e);
      if (this.peer.localDescription.sdp !== e.sdp) {
        var candidate = new RTCIceCandidate(e.candidate);
        this.peer.addIceCandidate(candidate);
      }
    });
  });
  peer.addEventListener('icecandidate', function (e) {
    if (!e.candidate) {
      return;
    }
    var candidate = e.candidate;
    io.emit('candidate', {candidate: candidate, sdp: peer.localDescription.sdp});
  });
  // sdpを作成し、自分に記憶させ、相手に送る処理
  function offer() {
    peer.createOffer(function(offer) {
      peer.setLocalDescription(new RTCSessionDescription(offer), function() {
        console.log('clientSide', 'offer');
        io.emit('SDP', {sdp: offer});
      });
    }, function(error) {
      console.log(error);
    });
    return;
  }
  // sdpが送られてきたときの処理
  // sdpを作成し、自分に記憶させ、相手に送る
  function answer() {
    peer.createAnswer(function(answer) {
      peer.setLocalDescription(new RTCSessionDescription(answer), function() {
        console.log('clientSide', 'answer');
        io.emit('SDP', {sdp: answer});
      });

      // DataChannelの接続を監視
      peer.ondatachannel = function(e) {
        // e.channelにtestが格納されているのでそれを使う
        console.log('ondDataChannel');
        test = e.channel;
      };

    }, function(error) {
      console.log(error);
    });
    return;
  }

  function message() {
    var text = document.getElementById('text');
    console.log(text);
    test.send(text.value);
    chat.innerHTML += '<div>' + text.value + '</div><br>';
    return;
  }

  test.onopen = function() {
    console.log('DataChannelOpen');
  }
  test.onmessage = function (event) {
    console.log('データチャネルメッセージ取得:', event.data);
    chat.innerHTML += '<div>' + event.data + '</div><br>';
  };
  */
