/*
 * app/models/album.js
 */

var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
    title : {type : String, require: "true"},
    displayOrder : {type : Number, require: "true"}
});

module.exports = mongoose.model('Album', albumSchema);
