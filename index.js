var Peer = require('simple-peer')
var peer1 = new Peer({
  initiator: location.hash === '#broadcast',
  trickle: false,
})

var peer2 = new Peer({
  initiator: location.hash === '#broadcast',
  trickle: false,
})

var broadcast = new Peer()



peer1.on('signal', function (data) {
  document.getElementById('peer1offer').value = JSON.stringify(data)

  console.log('OFFER FOR PEER1')
})


peer2.on('signal', function (data) {
  document.getElementById('peer2offer').value = JSON.stringify(data)
  
  console.log('OFFER FOR PEER2')
})


document.getElementById('connect1').addEventListener('click', function () {
  var otherId = JSON.parse(document.getElementById('peer1answer').value)
  peer1.signal(otherId)
  broadcast.signal(otherId)
  console.log('ANSWER ACK FOR PEER1')
})

document.getElementById('connect2').addEventListener('click', function () {
  var otherId = JSON.parse(document.getElementById('peer2answer').value)
  peer2.signal(otherId)
  broadcast.signal(otherId)
  console.log('ANSWER ACK FOR PEER2')
})


peer1.on('connect', (stream) => {
  peer1.send('hi peer1, this is broadcaster')
})

peer2.on('connect', (stream) => {
  peer2.send('hi peer2, this is broadcaster')
})

peer1.on('data', data => {
  console.log('got a message from peer1: ' + data)
})

peer2.on('data', data => {
  console.log('got a message from peer2: ' + data)
})


document.getElementById('send').addEventListener('click', function () {
  var yourMessage = document.getElementById('yourMessage').value
  peer1.send(yourMessage)
  peer2.send(yourMessage)
  peer1.addStream()
})
