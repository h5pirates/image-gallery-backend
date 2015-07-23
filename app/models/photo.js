/*
 * app/models/photo.js
 */

var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
    title : {type: String, require: true},
    url : {type: String, require: true},
    albumId : {type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true},
    globalDisplayOrder : {type: Number, require: true},
    albumDisplayOrder : Number
});

module.exports = mongoose.model('Photo', photoSchema);