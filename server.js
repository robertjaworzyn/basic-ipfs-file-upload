var config = require('./config');
//import apiRouter from './api';
var bodyParser = require('body-parser');
var express = require('express');
const server = express();

server.use(bodyParser.json());
server.set('view engine', 'ejs');

server.get(['/', '/about'], (req, res) => {
  res.render('index', {
    content: '...'
  });
});

//server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, () => {
  console.info('Express listening on port', config.port);
});
