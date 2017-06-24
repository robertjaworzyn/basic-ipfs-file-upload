import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';
import config from '../config';
//import ipfsAPI from 'ipfs-api';

//initialise mongo
let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  mdb = db;
});

//const ipfsApi = ipfsAPI('localhost', '5001');

const router = express.Router();

router.get('/files', (req, res) => {
  let files = [];
  mdb.collection('fileData').find({})
    .each((err, file) => {
      assert.equal(null,err);
      if (!file) {
        res.send({files});
        return;
      }
      files.push(file);

    })
})


router.post('/saveFile', (req, res) => {
  const name = req.body.name;
  const hash = req.body.hash;
  const desc = req.body.desc;
  mdb.collection('fileData').insertOne({name, hash, desc})
    .then(result => {
      assert.equal(1,result.insertedCount);
      res.send(result.insertedId);
    })

})

export default router;
