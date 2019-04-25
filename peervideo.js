var Peer = require('simple-peer')

var broadcaster = new Peer()

broadcaster.on('signal', function (data) {
  document.getElementById('broadcastanswer').value = JSON.stringify(data)
  console.log('ANSWER GENERATED FOR BROADCASTER')
  })


document.getElementById('connect').addEventListener('click', function () {
  var broadcastoffer = JSON.parse(document.getElementById('broadcastoffer').value)
  broadcaster.signal(broadcastoffer)
  console.log('SIGNALLED BROADCOASTER TO GENERATE ANSWER')
})

broadcaster.on('connect', () => {
  broadcaster.send('hi broadcaster this is a peer')
  console.log('CONNECTED')
})

broadcaster.on('data', data => {
  console.log('got a message from broadcaster ' + data)
})

broadcaster.on('data', function (data) {
  document.getElementById('messages').textContent += data + '\n'
})

broadcaster.on('stream', function (stream) {
  var video = document.createElement('video')
  document.body.appendChild(video)

  //video.src = window.URL.createObjectURL(stream)
video.srcObject=stream;
video.play();
  //video.play()
})
