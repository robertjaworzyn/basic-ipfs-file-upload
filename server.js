import config from './config';
import apiRouter from './api';
import bodyParser from 'body-parser';
import express from 'express';


const server = express();

server.use(bodyParser.json());
server.set('view engine', 'ejs');

server.get(['/', '/about'], (req, res) => {
  res.render('index', {
    content: '...'
  });
});

server.use('/api', apiRouter);
server.use(express.static('public'));
server.listen(config.port, () => {
  console.info('Express listening on port', config.port);
});
