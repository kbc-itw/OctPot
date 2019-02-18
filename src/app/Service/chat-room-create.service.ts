import {Injectable} from '@angular/core';
import * as client from 'socket.io-client';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';
import {CharacterDataListService} from './character-data-list.service';

@Injectable()
export class ChatRoomCreateService {
  // ホスト側が使うルーム作成クラス
  // ルームを作成、peerを作成、channelを作成
  // こっちでio.onでスタンバっといて入室者側のconnectが来たらoffer投げるようにするか
  // passはあとでいいか
  // peerは一人につき一つ必要
  // channelも？

  /*
  今の問題
  部屋から抜けて入ったらhostからのメッセージが届かない。いったん終了して接続しなおしてもだめ。一つのpcでためした。
   */
  private message_peer;
  private file_peer;
  private io;
  private message_channel;
  private file_channel;
  private member = [];
  private id;
  private name;
  private pass;
  public data = new BehaviorSubject<string>(null);
  private date: string;

  constructor(private cdl: CharacterDataListService) {
  }

  io_connect() {
    this.io = client.connect('http://150.95.205.204:80/');
    this.io.on('connect', (socket) => {
      console.log('connect');
    });
  }

  create(pass, name) {
    console.groupCollapsed('createFunction(service)');
    console.log('constructor', 'from', 'service');
    this.message_peer = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
    this.file_peer = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
    this.message_channel = this.message_peer.createDataChannel('message_channel');
    this.file_channel = this.file_peer.createDataChannel('file_channel');
    this.member.push({
      m_peer: this.message_peer, m_channel: this.message_channel,
      f_peer: this.file_peer, f_channel: this.file_channel
    });
    this.date = moment().format('YY/MM/DD HH:mm');
    this.name = name;
    this.pass = pass;
    this.data.next('ルームを作成しました。');
    console.profile('m_ondatachannel');
    this.message_dc();
    console.profileEnd();

    console.profile('m_onicecadidate');
    this.message_cd();
    console.profileEnd();

    console.profile('f_ondatachannel');
    this.file_dc();
    console.profileEnd();

    console.profile('f_onicecadidate');
    this.file_cd();
    console.profileEnd();

    console.profile('connectFunction');
    this.connect(pass);
    console.profileEnd();

    console.groupEnd();
  }

  message_dc() {
    this.member.forEach((e) => {
      console.log('peer; ', e.peer);
      console.log('channel: ', e.channel);
      console.log(e.file);
    });
    // message用ののイベントハンドラ
    // channelがつながったら？実行
    this.member[this.member.length - 1].m_peer.ondatachannel = (e) => {
      console.groupCollapsed('dcFunction');
      // e.channelにtestが格納されているのでそれを使う
      console.log('ondDataChannel');
      // console.log(e.candidate.candidate.split(' ')[4]); // address
      console.log(this.member[this.member.length - 1].m_channel);
      console.groupEnd();
    };
    // channelが開いたら実行
    this.member[this.member.length - 1].m_channel.onopen = () => {
      console.log('DataChannelOpen');
      this.message_peer = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
      this.file_peer = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
      this.message_channel = this.message_peer.createDataChannel('message_channel');
      this.file_channel = this.file_peer.createDataChannel('file_channel');
      this.member.push({
        m_peer: this.message_peer, m_channel: this.message_channel,
        f_peer: this.file_peer, f_channel: this.file_channel
      });
      console.log(this.member);
      try {
        this.message_dc();
        this.message_cd();
        this.file_dc();
        this.file_cd();
      } catch (e) {
        console.log('local dc and cd');
        console.log(e);
      }
    };
    // channelの接続相手からmessageが来たとき実行
    this.member[this.member.length - 1].m_channel.onmessage = (event) => {
      console.log('データチャネルメッセージ取得:', event.data);
      var val = event.data;
      this.data.next(val);
      this.member.forEach((e) => {
        if (event.currentTarget !== e.m_channel) {
          console.log(e.currentTarget);
          console.log(e.m_channel);
          if (e.m_channel.readyState === 'open') {
            e.m_channel.send(val);
          }
        }
      });
    };
    this.member[this.member.length - 1].m_channel.onclose = () => {
      console.log('DataChannelClose');
    };
    this.member[this.member.length - 1].m_channel.onerror = (err) => {
      console.log(err);
    };
  }

  message_cd() {
    this.member[this.member.length - 1].m_peer.onicecandidate = (e) => {
      console.groupCollapsed('onicecadidate');
      if (e.candidate) {
        this.io.emit('candidate', {candidate: e.candidate, sdp: this.member[this.member.length - 1].m_peer.localDescription.sdp});
      } else {
        console.log('candi  err');
        return;
      }
      console.groupEnd();
    };
  }

  file_dc() {
    this.member.forEach((e) => {
      console.log('peer; ', e.peer);
      console.log('channel: ', e.channel);
      console.log(e.file);
    });
    // file用のイベントハンド
    // channelがつながったら？実行
    this.member[this.member.length - 1].f_peer.ondatachannel = (e) => {
      console.groupCollapsed('dcFunction');
      // e.channelにtestが格納されているのでそれを使う
      console.log('ondDataChannel');
      // console.log(e.candidate.candidate.split(' ')[4]); // address
      console.log(this.member[this.member.length - 1].f_channel);
      console.groupEnd();
    };

    // channelが開いたら実行
    this.member[this.member.length - 1].f_channel.onopen = () => {
      console.log('DataChannelOpen');
    };
    // channelの接続相手からmessageが来たとき実行
    this.member[this.member.length - 1].f_channel.onmessage = (event) => {
      console.log('データチャネルメッセージ取得:', event.data);
      console.log(event.data[0]);
      console.log(typeof event.data);
      try {
        this.cdl.onNotifyShareDataChanged(event.data);
      } catch (e) {
        console.log(e);
      }
      this.member.forEach((e) => {
        if (e.f_channel.readyState === 'open') {
          if (true) { // 送って来たやつ以外
            e.f_channel.send(event.data);
            console.log('file_OK');
          }
        }
      });
    };
    this.member[this.member.length - 1].f_channel.onclose = () => {
      console.log('DataChannelClose');
    };
    this.member[this.member.length - 1].f_channel.onerror = (err) => {
      console.log(err);
    };
  }

  file_cd() {
    this.member[this.member.length - 1].f_peer.onicecandidate = (e) => {
      console.groupCollapsed('onicecadidate');
      if (e.candidate) {
        this.io.emit('candidate', {candidate: e.candidate, sdp: this.member[this.member.length - 1].f_peer.localDescription.sdp});
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

  get_member() {
    return this.member;
  }

  get_id() {
    return this.id;
  }

  get_name() {
    return this.name;
  }

  get_pass() {
    return this.pass;
  }

  // peer通信を始める準備
  connect(pass) {
    console.groupCollapsed('connectFunction');
    console.log('connect service');
    console.profile('sdpFunction');
    this.message_sdp();
    this.file_sdp();
    console.profileEnd();

    this.io.emit('create', {pass: pass});
    this.io.emit('id');
    console.groupCollapsed('ioのconnect');
    console.log('clientSide', 'connect');
    console.groupEnd();

    this.io.on('create', (e) => {
      console.log('create', e);
    });
    this.io.on('hello', (e) => {
      console.log('hello', e);
    });
    this.io.on('enter', (e) => {
      console.log('enter');
      console.log('client: ', e, 'が申請してきました。');
      this.message_offer(e);
      this.file_offer(e);
    });
    this.io.on('id', (e) => {
      console.groupCollapsed('ioのid');
      console.log(e);
      this.id = e;
      console.groupEnd();
    });
    console.groupEnd();
  }

  // SDPofferが送られてきたときの処理
  message_sdp() {
    console.groupCollapsed('sdpFunction');
    console.log('from here socket function');
    // let answer = this.answer;
    this.io.on('SDP', (e) => {
      console.groupCollapsed('ioのSDP');
      console.log('clientSide', 'SDP');
      if (!e.sdp.sdp) {
        console.log('sdp.sdp is not property');
        return;
      }
      if (e.sdp.sdp !== this.member[this.member.length - 1].m_peer.localDescription.sdp) {
        console.log('check the sdp');
        var description = new RTCSessionDescription(e.sdp);
        console.log(description);
        this.member[this.member.length - 1].m_peer.setRemoteDescription(description, () => {
          console.log('peerDescription');
          console.log('desctype= ', description.type);
          if (description.type === 'offer') {
            console.log('sdp type is offer');
            console.log(this.member[this.member.length - 1].m_peer);
            console.profile('answerFunction');
            console.profileEnd();
          }
        });
      }
      console.groupEnd();
    });
    // candidateを受け取る処理
    this.io.on('candidate', (e) => {
      console.groupCollapsed('ioのcandidate');
      if (this.member[this.member.length - 1].m_peer.localDescription.sdp !== e.sdp) {
        console.log('candis ok');
        if (e.candidate) {
          var candidate = new RTCIceCandidate(e.candidate);
          this.member[this.member.length - 1].m_peer.addIceCandidate(candidate);
        }
      }
      console.groupEnd();
    });
    console.groupEnd();
  }

  file_sdp() {
    console.groupCollapsed('sdpFunction');
    console.log('from here socket function');
    // let answer = this.answer;
    this.io.on('File_SDP', (e) => {
      console.groupCollapsed('ioのSDP');
      console.log('clientSide', 'SDP');
      if (!e.sdp.sdp) {
        console.log('sdp.sdp is not property');
        return;
      }
      if (e.sdp.sdp !== this.member[this.member.length - 1].f_peer.localDescription.sdp) {
        console.log('check the sdp');
        var description = new RTCSessionDescription(e.sdp);
        console.log(description);
        this.member[this.member.length - 1].f_peer.setRemoteDescription(description, () => {
          console.log('peerDescription');
          console.log('desctype= ', description.type);
          if (description.type === 'offer') {
            console.log('sdp type is offer');
            console.log(this.member[this.member.length - 1].f_peer);
            console.profile('answerFunction');
            console.profileEnd();
          }
        });
      }
      console.groupEnd();
    });
    // candidateを受け取る処理
    this.io.on('candidate', (e) => {
      console.groupCollapsed('ioのcandidate');
      if (this.member[this.member.length - 1].f_peer.localDescription.sdp !== e.sdp) {
        console.log('candis ok');
        if (e.candidate) {
          var candidate = new RTCIceCandidate(e.candidate);
          this.member[this.member.length - 1].f_peer.addIceCandidate(candidate);
        }
      }
      console.groupEnd();
    });
    console.groupEnd();
  }

  // sdpを送る処理
  message_offer(client) {
    console.groupCollapsed('offerFunction');
    console.log('this from offer');
    this.member[this.member.length - 1].m_peer.createOffer((offer) => {
      this.member[this.member.length - 1].m_peer.setLocalDescription(new RTCSessionDescription(offer), () => {
        console.log('HostSide', 'offer');
        console.log(client);
        this.io.emit('offer', {sdp: offer}, {client: client});
      });
    }, function (error) {
      console.log(error);
    });
    console.groupEnd();
    return;
  }

  // sdpを送る処理
  file_offer(client) {
    console.groupCollapsed('offerFunction');
    console.log('this from offer');
    this.member[this.member.length - 1].f_peer.createOffer((offer) => {
      this.member[this.member.length - 1].f_peer.setLocalDescription(new RTCSessionDescription(offer), () => {
        console.log('HostSide', 'offer');
        console.log(client);
        this.io.emit('file_offer', {sdp: offer}, {client: client});
      });
    }, function (error) {
      console.log(error);
    });
    console.groupEnd();
    return;
  }

  message(e, bool = false) {
    if (!bool) {
      var value: string = this.name + '(ホスト)' + ': ' + e;
      try {
        this.member.forEach((e) => {
          console.log('--------------------------------------------------------------------', e);
          e.m_channel.send(value);
        });
        // this.member[this.member.length - 1].channel.send(value);
      } catch (e) {
        console.log('message: ');
        console.log(e);
      }
    } else if (bool) {
      // sercretdice
      var value: string = this.name + ': ' + 'シークレットダイス';
      try {
        this.member.forEach((e) => {
          console.log('--------------------------------------------------------------------', e);
          e.m_channel.send(value);
        });
      } catch (e) {
        console.log('message: ');
        console.log(e);
      }
      value = this.name + ': ' + e;
    }
    this.data.next(value);
  }

  leave() {
    this.io.close();
    var value = this.name + 'が退出しました。';
    try {
      this.member.forEach((e) => {
        if (e.m_channel.readyState === 'open') {
          console.log('--------------------------------------------------------------------', e);
          e.m_channel.send(value); // closeのほうが早いのでこれ意味ないかも
          e.m_channel.close();
          e.f_channel.close();
        }
      });
      // this.member[this.member.length - 1].channel.send(value);
    } catch (e) {
      console.log('leave: ');
      console.log(e);
    }
    this.member = [];
    this.data.next(null);
  }
}
