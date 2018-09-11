import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
@Injectable()

export class ChatRoomService {
  // staticにするべきか？ メリット：クラス外からの参照が可　デメリット：参照されすぎ
  // 参照されて困らないものだったらいいのでは？
  public static peer;
  public static io;
  private channel;
  //  private chat = document.getElementById('chat');
  //  private test = this.peer.createDataChannel('my channel');

  // init時にpeerを作成し、ioに接続先を設定する。
  // そのあとにconnectを呼び出す。
  constructor() {
    ChatRoomService.peer = new RTCPeerConnection({});
    ChatRoomService.io = io('http://localhost:3000');
    console.log('constructor', 'from', 'service');
    this.connect();
    // SDPofferが送られてきたときの処理
    ChatRoomService.io.on('SDP', function(e) {
      console.log('clientSide', 'SDP');
      console.log(e.sdp.type);
      console.log(ChatRoomService.peer.localDescription.sdp);
      if (!e.sdp.sdp) {
        console.log('sdp.sdp is not property');
        return;
      }
      // ここでoffer側がremoteに自身をsetしないようにする
      if (e.sdp.sdp === ChatRoomService.peer.localDescription.sdp) {
        console.log(e);

        var description = new RTCSessionDescription(e.sdp);
        ChatRoomService.peer.setRemoteDescription(description, function () {
          console.log(description.type);
          if (description.type === 'offer') {
            console.log('sdp type is offer');
            // answer();
          }
        });
      }
    });
  }
  // ioサーバに接続を試みる。
  connect() {
    ChatRoomService.io.on('connect', function (socket) {
      console.log('clientSide', 'connect');
      offer();
    });
  }
}
function offer() {
  var peer = ChatRoomService.peer;
  peer.createOffer(function(offer) {
    peer.setLocalDescription(new RTCSessionDescription(offer), function() {
      console.log('clientSide', 'offer');
      ChatRoomService.io.emit('SDP', {sdp: offer});
    });
  }, function(error) {
    console.log(error);
  });
  return;
}
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
