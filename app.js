const io = require('socket.io').listen(3113);
const redis = require('redis');
const config = require('./config');
const pub = redis.createClient(config.redisPort, config.redisHost);
const sub = redis.createClient(config.redisPort, config.redisHost);

sub.subscribe('chat');

function sendPublish(channel, type, message){
    let socketTemplate = {
        type: type,
        message: message,
    };
    pub.publish(channel, JSON.stringify(socketTemplate));
}

io.sockets.on('connection', (socket) => {
  socket.on('join', () => {
      sendPublish('chat', 'join');
  });
  socket.on('message', (msg) => {
      sendPublish('chat', 'message', msg);
  });
  sub.on('message', (channel, jsonData) => {
      let data = JSON.parse(jsonData);
      if(data.type === 'join') socket.emit('message', ' : : : 익명의 누군가가 접속했습니다! : : :');
      else if(data.type === 'message') socket.emit('message', data.message);
  });
});