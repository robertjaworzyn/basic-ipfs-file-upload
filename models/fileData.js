import mongoose from 'mongoose';

var fileDataSchema = new mongoose.Schema({
  name: String,
  hash: String,
  desc: String
});

var FileModel = mongoose.model('File', fileDataSchema);

export default FileModel;
