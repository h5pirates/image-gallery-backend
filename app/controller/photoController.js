/*
 * app/controller/photoController.js
 */

module.exports = function(Album, Photo) {
    return {
        getAllPhotos : function(req, res) {
            Photo.find({}).sort({'globalDisplayOrder': 1}).exec(function(err, photos) {
                var result = [];
                if (photos) {
                    for (var i = 0; i < photos; i++) {
                        var photoData = {
                            id: photos[i]._id,
                            url: photos[i].url,
                            albumId: photos[i].albumId,
                            globalDisplayOrder: photos[i].globalDisplayOrder,
                            albumDisplayOrder: photos[i].albumDisplayOrder
                        };
                        result.push(photoData);
                    }
                }
                res.json(result);
            });
        },

        getPhoto : function(req, res) {
            Photo.findOne({_id : req.params.id}, function(err, photo) {
                if (err || !photo) {
                    res.json({success: false});
                } else {
                    var photoData = {
                        id : photo._id,
                        url : photo.url,
                        albumId : photo.albumId,
                        globalDisplayOrder : photo.globalDisplayOrder,
                        albumDisplayOrder : photo.albumDisplayOrder
                    };
                    res.json({
                        success : true,
                        data : photoData
                    });
                }
            });
        },

        createPhoto : function(req, res) {
            var photo = new Photo();
            photo.title = req.body.title;
            photo.url = "fakeurl";
            Photo.find({}, function(err, photos) {
                photo.globalDisplayOrder = photos.length;

                photo.albumId = req.body.albumId;
                Photo.find({albumId: req.body.albumId}, function(err, albumPhotos) {
                    photo.albumDisplayOrder = albumPhotos.length;
                    photo.save(function(err) {
                        var photoData = {
                            id : photo._id,
                            url : photo.url,
                            albumId : photo.albumId,
                            globalDisplayOrder : photo.globalDisplayOrder,
                            albumDisplayOrder : photo.albumDisplayOrder
                        };
                        res.json({
                            success : true,
                            data : photoData
                        });
                    });
                });
            });
        },

        updatePhotoTitle : function(req, res) {
            Photo.findOne({_id: req.params.id}, function(err, photo) {
                if (err || !photo) {
                    res.json({success: false});
                } else {
                    photo.title = req.body.title;
                    photo.save(function (err) {
                        res.json({success: true});
                    });
                }
            })
        },

        updatePhotoAlbumId : function(req, res) {
            Photo.findOne({_id: req.params.id}, function(err, photo) {
                if (err || !photo) {
                    res.json({success: false});
                } else {
                    photo.albumId = req.body.albumId;
                    Photo.find({albumId: req.body.albumId}, function(err, albumPhotos) {
                        photo.albumDisplayOrder = albumPhotos.length;
                        res.json({ success : true });
                    });
                }
            });
        },

        updatePhotoGlobalDisplayOrder : function(req, res) {
        },

        updatePhotoAlbumDisplayOrder : function(req, res) {
        },

        deletePhoto : function(req, res) {
            Photo.remove({_id : req.params.id}, function(err) {
                res.json({success : true});
            });
        }
    }
};
