/*
 * app/controller/albumController.js
 */

module.exports = function(Album, Photo) {
    return {
        getAllAlbums : function(req, res) {
            Album.find({}).sort({'displayOrder': 1}).exec(function(err, albums) {
                var result = [];
                if (albums) {
                    for (var i = 0; i < albums.length; i++) {
                        var album = {
                            id : albums[i]._id,
                            title : albums[i].title,
                            displayOrder : albums[i].displayOrder
                        };
                        result.push(album);
                    }
                }
                res.json({
                    success : true,
                    data : result
                });
            });
        },

        getAlbum : function(req, res) {
            Album.findOne({_id : req.params.id}, function(err, album) {
                if (err || !album) {
                    res.json({success: false});
                }

                var albumData = {
                    id : album._id,
                    title : album.title,
                    displayOrder : album.displayOrder
                };

                res.json({
                    success : true,
                    data : albumData
                });
            })
        },

        createAlbum : function(req, res) {
            var album = new Album();
            album.title = req.params.title;
            Album.find({}, function(err, albums) {
                album.displayOrder = albums.length;
                album.save(function(err) {
                    var albumData = {
                        id : album._id,
                        title : album.title,
                        displayOrder : album.displayOrder
                    };
                    res.json({
                        success : true,
                        data : albumData
                    });
                });
            });
        },

        updateAlbumTitle : function(req, res) {
            Album.findOne({_id: req.params.id}, function(err, album) {
                album.title = req.body.title;
                album.save(function(err) {
                    res.json({success : true});
                });
            });
        },

        updateAlbumDisplayOrder : function(req, res) {
            Album.findOne({_id: req.params.id}, function(err, album) {
                album.displayOrder = req.body.displayOrder;
                album.save(function(err) {
                    res.json({success : true});
                });
            });
        },

        deleteAlbum : function(req, res) {
            Album.findOne({_id: req.params.id}, function(err, album) {
                if (album) {
                    Photo.remove({albumId : album._id}, function(err) {
                        album.remove();
                        album.save(function (err) {
                            res.json({success : true});
                        });
                    });
                }
            });
        }
    }
};