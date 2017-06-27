import express from 'express';
import assert from 'assert';
import mongoose from 'mongoose';

import FileModel from '../models/fileData';
import config from '../config';

mongoose.connect(config.mongodbUri);
var mdb = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
mdb.on('error', console.error.bind(console, 'MongoDB connection error:'));

const router = express.Router();

router.get('/files', (req, res) => {
  FileModel.find({}, (err, results) => {
    if (err) console.error(err);
    res.send({results});
  })
})


router.post('/saveFile', (req, res) => {

  FileModel.create({...req.body}, (err,result) => {
    if (err) console.error(err);
    res.send(result._id);
  });

})

export default router;
