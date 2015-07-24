/*
 * app/models/photo.js
 */

var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
    title : String,
    url : {type: String, require: true},
    albumId : {type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true},
    mimeType : String,
    globalDisplayOrder : Number,
    albumDisplayOrder : Number
});

module.exports = mongoose.model('Photo', photoSchema);