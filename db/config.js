/*
 * db/config.js
 */

module.exports = function() {
    return {
        url : 'mongodb://localhost/image-gallery',
        setup : function() {
            var db = mongoose.connection;
            db.on('error', console.error.bind(
                console, 'cannot connect to mongodb://localhost/image-gallery'));
            db.once('open', function() {
                console.log("connect to database success!");
            })
        }
    }
}
