var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname+'\\index.html');
});

app.get('/api/*', function(req, res){
  io.emit('message', { for: req.originalUrl, body : req.body });
  res.sendStatus(200);
});

app.post('/api/*', function(req, res){
  io.emit('message', { for: req.originalUrl, body : req.body });
  res.sendStatus(200);
});

io.on('connection', function(socket){
  console.log('a user connected gogo');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});



http.listen(80, function(){
  console.log('listening on *:80');
});

