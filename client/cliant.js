
 let localVideo = document.getElementById('local_video');
 let localStream = null;
 // ---- for multi party -----
 let peerConnections = [];
 //let remoteStreams = [];
 let remoteVideos = [];
 const MAX_CONNECTION_COUNT = 3;
 // --- multi video ---
 let container = document.getElementById('container');
 _assert('container', container);
 // --- prefix -----
 navigator.getUserMedia  = navigator.getUserMedia    || navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia || navigator.msGetUserMedia;
 RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
 RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription;

 // ----- use socket.io ---
 let port = 3000;
 //使いたいサーバーのURLに変更しておく
 let socket = io.connect('http://localhost:' + port);
// let socket = io.connect('http://www.seshiba.xyz:' + port + '/');

 let room = getRoomName();
 socket.on('connect', function(evt) {
   console.log('socket.io connected. enter room=' + room );
   socket.emit('enter', room);
 });


 //メッセージ受信いぇい
 socket.on('message', function(message) {
   console.log('message:', message);

   let fromId = message.from;
   if (message.type === 'offer') {
     // -- got offer ---
     console.log('Received offer ...');
     let offer = new RTCSessionDescription(message);
     setOffer(fromId, offer);
   }
   else if (message.type === 'answer') {
     // --- got answer ---
     console.log('Received answer ...');
     let answer = new RTCSessionDescription(message);
     setAnswer(fromId, answer);
   }
   else if (message.type === 'candidate') {
     // --- got ICE candidate ---
     console.log('Received ICE candidate ...');
     let candidate = new RTCIceCandidate(message.ice);
     console.log(candidate);
     addIceCandidate(fromId, candidate);
   }
   else if (message.type === 'call me') {
     if (! isReadyToConnect()) {
       console.log('Not ready to connect, so ignore');
       return;
     }
     else if (! canConnectMore()) {
       console.warn('TOO MANY connections, so ignore');
     }
     if (isConnectedWith(fromId)) {
       // already connnected, so skip
       console.log('already connected, so ignore');
     }
     else {
       // connect new party
       makeOffer(fromId);
     }
   }
   else if (message.type === 'bye') {
     if (isConnectedWith(fromId)) {
       stopConnection(fromId);
     }
   }

   addMessage(message.value);
 });


 socket.on('user disconnected', function(evt) {
   console.log('====user disconnected==== evt:', evt);
   let id = evt.id;
   if (isConnectedWith(id)) {
     stopConnection(id);
   }
 });


 // --- broadcast message to all members in room
 function emitRoom(msg) {
   socket.emit('message', msg);
 }
 function emitTo(id, msg) {
   msg.sendto = id;
   socket.emit('message', msg);
 }
 // -- room名を取得 --
 function getRoomName() { // たとえば、 URLに  ?roomname  とする
   let url = document.location.href;
   let args = url.split('?');
   if (args.length > 1) {
     let room = args[1];
     if (room != '') {
       return room;
     }
   }
   return '_testroom';
 }
 // ---- for multi party -----
 function isReadyToConnect() {
   if (localStream) {
     return true;
   }
   else {
     return false;
   }
 }
 // --- RTCPeerConnections ---
 function getConnectionCount() {
   return peerConnections.length;
 }
 function canConnectMore() {
   return (getConnectionCount() < MAX_CONNECTION_COUNT);
 }
 function isConnectedWith(id) {
   if (peerConnections[id])  {
     return true;
   }
   else {
     return false;
   }
 }
 function addConnection(id, peer) {
   _assert('addConnection() peer', peer);
   _assert('addConnection() peer must NOT EXIST', (! peerConnections[id]));
   peerConnections[id] = peer;
 }
 function getConnection(id) {
   let peer = peerConnections[id];
   _assert('getConnection() peer must exist', peer);
   return peer;
 }
 function deleteConnection(id) {
   _assert('deleteConnection() peer must exist', peerConnections[id]);
   delete peerConnections[id];
 }
 function stopConnection(id) {
   detachVideo(id);
   if (isConnectedWith(id)) {
     let peer = getConnection(id);
     peer.close();
     deleteConnection(id);
   }
 }
 function stopAllConnection() {
   for (let id in peerConnections) {
     stopConnection(id);
   }
 }
 // --- video elements ---
 function attachVideo(id, stream) {
   let video = addRemoteVideoElement(id);
   playVideo(video, stream);
   video.volume = 1.0;
 }
 function detachVideo(id) {
   let video = getRemoteVideoElement(id);
   pauseVideo(video);
   deleteRemoteVideoElement(id);
 }

 function isRemoteVideoAttached(id) {
   if (remoteVideos[id]) {
     return true;
   }
   else {
     return false;
   }
 }
 function addRemoteVideoElement(id) {
   _assert('addRemoteVideoElement() video must NOT EXIST', (! remoteVideos[id]));
   let video = createVideoElement('remote_video_' + id);
   remoteVideos[id] = video;
   return video;
 }
 function getRemoteVideoElement(id) {
   let video = remoteVideos[id];
   _assert('getRemoteVideoElement() video must exist', video);
   return video;
 }
 function deleteRemoteVideoElement(id) {
   _assert('deleteRemoteVideoElement() stream must exist', remoteVideos[id]);
   removeVideoElement('remote_video_' + id);
   delete remoteVideos[id];
 }
 function createVideoElement(elementId) {
   let video = document.createElement('video');
   video.width = '240';
   video.height = '180';
   video.id = elementId;
   video.style.border = 'solid black 1px';
   video.style.margin = '2px';
   container.appendChild(video);
   return video;
 }
 function removeVideoElement(elementId) {
   let video = document.getElementById(elementId);
   _assert('removeVideoElement() video must exist', video);
   container.removeChild(video);
   return video;
 }

 // ---------------------- media handling -----------------------
 // start local video
 function startVideo() {
   getDeviceStream({video: true, audio: true}) // audio: false <-- ontrack once, audio:true --> ontrack twice!!
   .then(function (stream) { // success
     localStream = stream;
     playVideo(localVideo, stream);
   }).catch(function (error) { // error
     console.error('getUserMedia error:', error);
     return;
   });
 }
 // stop local video
 function stopVideo() {
   pauseVideo(localVideo);
   stopLocalStream(localStream);
   localStream = null;
 }

 function stopLocalStream(stream) {
   let tracks = stream.getTracks();
   if (! tracks) {
     console.warn('NO tracks');
     return;
   }

   for (let track of tracks) {
     track.stop();
   }
 }

 function getDeviceStream(option) {
   if ('getUserMedia' in navigator.mediaDevices) {
     console.log('navigator.mediaDevices.getUserMadia');
     return navigator.mediaDevices.getUserMedia(option);
   }
   else {
     console.log('wrap navigator.getUserMadia with Promise');
     return new Promise(function(resolve, reject){
       navigator.getUserMedia(option,
         resolve,
         reject
       );
     });
   }
 }

 function playVideo(element, stream) {
   if ('srcObject' in element) {
     element.srcObject = stream;
   }
   else {
     element.src = window.URL.createObjectURL(stream);
   }
   element.play();
   element.volume = 0;
 }

 function pauseVideo(element) {
   element.pause();
   if ('srcObject' in element) {
     element.srcObject = null;
   }
   else {
     if (element.src && (element.src !== '') ) {
       window.URL.revokeObjectURL(element.src);
     }
     element.src = '';
   }
 }

 function sendSdp(id, sessionDescription) {
   console.log('---sending sdp ---');

   let message = { type: sessionDescription.type, sdp: sessionDescription.sdp };
   console.log('sending SDP=' + message);
   emitTo(id, message);
 }
 function sendIceCandidate(id, candidate) {
   console.log('---sending ICE candidate ---');
   let obj = { type: 'candidate', ice: candidate };
   emitTo(id, obj);
 }

 // ---------------------- connection handling -----------------------
 function prepareNewConnection(id) {
   let pc_config = {"iceServers":[]};
   let peer = new RTCPeerConnection(pc_config);
   // --- on get remote stream ---
   if ('ontrack' in peer) {
     peer.ontrack = function(event) {
       let stream = event.streams[0];
       console.log('-- peer.ontrack() stream.id=' + stream.id);
       if (isRemoteVideoAttached(id)) {
         console.log('stream already attached, so ignore');
       }
       else {
         //playVideo(remoteVideo, stream);
         attachVideo(id, stream);
       }
     };
   }
   else {
     peer.onaddstream = function(event) {
       let stream = event.stream;
       console.log('-- peer.onaddstream() stream.id=' + stream.id);
       //playVideo(remoteVideo, stream);
       attachVideo(id, stream);
     };
   }
   // --- on get local ICE candidate
   peer.onicecandidate = function (evt) {
     if (evt.candidate) {
       console.log(evt.candidate);
       // Trickle ICE の場合は、ICE candidateを相手に送る
       sendIceCandidate(id, evt.candidate);
       // Vanilla ICE の場合には、何もしない
     } else {
       console.log('empty ice event');
     }
   };
   // --- when need to exchange SDP ---
   peer.onnegotiationneeded = function(evt) {
     console.log('-- onnegotiationneeded() ---');
   };
   // --- other events ----
   peer.onicecandidateerror = function (evt) {
     console.error('ICE candidate ERROR:', evt);
   };
   peer.onsignalingstatechange = function() {
     console.log('== signaling status=' + peer.signalingState);
   };
   peer.oniceconnectionstatechange = function() {
     console.log('== ice connection status=' + peer.iceConnectionState);
     if (peer.iceConnectionState === 'disconnected') {
       console.log('-- disconnected --');
       //hangUp();
       stopConnection(id);
     }
   };
   peer.onicegatheringstatechange = function() {
     console.log('==***== ice gathering state=' + peer.iceGatheringState);
   };

   peer.onconnectionstatechange = function() {
     console.log('==***== connection state=' + peer.connectionState);
   };
   peer.onremovestream = function(event) {
     console.log('-- peer.onremovestream()');
     //pauseVideo(remoteVideo);
     deleteRemoteStream(id);
     detachVideo(id);
   };


   // -- add local stream --
   if (localStream) {
     console.log('Adding local stream...');
     peer.addStream(localStream);
   }
   else {
     console.warn('no local stream, but continue.');
   }
   return peer;
 }
 function makeOffer(id) {
   _assert('makeOffer must not connected yet', (! isConnectedWith(id)) );
   peerConnection = prepareNewConnection(id);
   addConnection(id, peerConnection);
   peerConnection.createOffer()
   .then(function (sessionDescription) {
     console.log('createOffer() succsess in promise');
     return peerConnection.setLocalDescription(sessionDescription);
   }).then(function() {
     console.log('setLocalDescription() succsess in promise');
     // -- Trickle ICE の場合は、初期SDPを相手に送る --
     sendSdp(id, peerConnection.localDescription);
     // -- Vanilla ICE の場合には、まだSDPは送らない --
   }).catch(function(err) {
     console.error(err);
   });
 }
 function setOffer(id, sessionDescription) {
   _assert('setOffer must not connected yet', (! isConnectedWith(id)) );
   let peerConnection = prepareNewConnection(id);
   addConnection(id, peerConnection);

   peerConnection.setRemoteDescription(sessionDescription)
   .then(function() {
     console.log('setRemoteDescription(offer) succsess in promise');
     makeAnswer(id);
   }).catch(function(err) {
     console.error('setRemoteDescription(offer) ERROR: ', err);
   });
 }

 function makeAnswer(id) {
   console.log('sending Answer. Creating remote session description...' );
   let peerConnection = getConnection(id);
   if (! peerConnection) {
     console.error('peerConnection NOT exist!');
     return;
   }

   peerConnection.createAnswer()
   .then(function (sessionDescription) {
     console.log('createAnswer() succsess in promise');
     return peerConnection.setLocalDescription(sessionDescription);
   }).then(function() {
     console.log('setLocalDescription() succsess in promise');
     // -- Trickle ICE の場合は、初期SDPを相手に送る --
     sendSdp(id, peerConnection.localDescription);
     // -- Vanilla ICE の場合には、まだSDPは送らない --
   }).catch(function(err) {
     console.error(err);
   });
 }
 function setAnswer(id, sessionDescription) {
   let peerConnection = getConnection(id);
   if (! peerConnection) {
     console.error('peerConnection NOT exist!');
     return;
   }
   peerConnection.setRemoteDescription(sessionDescription)
   .then(function() {
     console.log('setRemoteDescription(answer) succsess in promise');
   }).catch(function(err) {
     console.error('setRemoteDescription(answer) ERROR: ', err);
   });
 }
 // --- tricke ICE ---
 function addIceCandidate(id, candidate) {
   let peerConnection = getConnection(id);
   if (peerConnection) {
     peerConnection.addIceCandidate(candidate);
   }
   else {
     console.error('PeerConnection not exist!');
     return;
   }
 }

 // start PeerConnection
 function connect() {
   callMe();
   // if (! isReadyToConnect()) {
   //   console.warn('NOT READY to connect');
   // }
   // else if (! canConnectMore()) {
   //   console.log('TOO MANY connections');
   // }
   // else {
   //   callMe();
   // }
 }
 // close PeerConnection
 function hangUp() {

   emitRoom({ type: 'bye' });
   stopAllConnection();
 }
 // ---- multi party --
 function callMe() {
   emitRoom({type: 'call me'});
 }




 //チャット機能

 //ID:messでクライアントにmsgを送ります
 function sendChat(msg){
     socket.emit('mess',msg);
 }

 //メッセージ送信処理
 function sendMessage() {
     var msg = document.getElementById("msgForm").value;  //メッセージ読み込む
     var msgname = document.getElementById("msgname").value; //発言者の名前を取得
     var msgcolor = document.getElementById('messageColor').value;
     var sendObject = {value:msg,sendername:msgname,color:msgcolor,date:""};
     sendChat(sendObject); //サーバーにmsgを送る
     //addMsgList(sendObject);   //自分のチャット欄に追加
     console.log("おくった:"+sendObject);  //一応確認用にmsgの中身を表示
     document.getElementById("msgForm").value = ""; //メッセージを送ったら入力欄を空欄に
 }

 //メッセージ受信処理
 socket.on('mess', function(message) {
     console.log('mess:', message);

     let fromId = message.from;
     if (message.type === 'offer') {
         // -- got offer ---
         console.log('Received offer ...');
         let offer = new RTCSessionDescription(message);
         setOffer(fromId, offer);
     }
     else if (message.type === 'answer') {
         // --- got answer ---
         console.log('Received answer ...');
         let answer = new RTCSessionDescription(message);
         setAnswer(fromId, answer);
     }
     else if (message.type === 'candidate') {
         // --- got ICE candidate ---
         console.log('Received ICE candidate ...');
         let candidate = new RTCIceCandidate(message.ice);
         console.log(candidate);
         addIceCandidate(fromId, candidate);
     }
     else if (message.type === 'call me') {
         if (! isReadyToConnect()) {
             console.log('Not ready to connect, so ignore');
             return;
         }
         else if (! canConnectMore()) {
             console.warn('TOO MANY connections, so ignore');
         }
         if (isConnectedWith(fromId)) {
             // already connnected, so skip
             console.log('already connected, so ignore');
         }
         else {
             // connect new party
             makeOffer(fromId);
         }
     }
     else if (message.type === 'bye') {
         if (isConnectedWith(fromId)) {
             stopConnection(fromId);
         }
     }

     addMsgList(message);
     //addMessage(message.value);
 });


 //valueをメッセージ欄に追加します
 function addMsgList(chatObject){
     var msglist = document.getElementById("msglist");
     msglist.innerHTML += "<p class=\"message\" style=\"color: " + chatObject.color + "\">\n" +
         "<span class=\"name\">[" + chatObject.sendername + "]:</span>\n" +
         "<span class=\"text\">"+ chatObject.value +"</span>\n" +
         "<span class=\"time\">(" + chatObject.date  + ")</span>\n" +
         "</p>";
     // msglist.innerHTML += "<span class=\"name\">[" + chatObject.sendername + "]:</span>"
     // msglist.innerHTML += "<span class=\"text\">"+ chatObject.value +"</span>";
     // msglist.innerHTML += "<span class=\"time\">(タイムスタンプ)</span>"
     // msglist.innerHTML += "</p>"
 }
