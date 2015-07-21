/*
 * app/models/photo.js
 */

var mongoose = require('mongoose');

var photoSchema = new mongoose.schema({
    title : {type: String, require: true},
    albumId : {type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true}
    globalDisplayOrder : Number,
    albumDisplayOrder : Number
});

module.exports = mongoose.model('Photo', photoSchema);