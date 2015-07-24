/*
 * app/controller/photoController.js
 */

var fs = require('fs');

module.exports = function(Album, Photo) {
    var _serializePhoto = function(photo) {
        if (photo) {
            var photoData = {
                id : photo._id,
                title : photo.title,
                url : photo.url,
                mimeType : photo.mimeType,
                albumId : photo.albumId,
                globalDisplayOrder : photo.globalDisplayOrder,
                albumDisplayOrder : photo.albumDisplayOrder
            };
            return photoData;
        }
    };

    var _serializePhotos = function(photos) {
        var result = [];
        if (photos) {
            for (var i = 0; i < photos.length; i++) {
                var photoData = _serializePhoto(photos[i]);
                if (photoData && photoData !== {}) {
                    result.push(photoData);
                }
            }
        }
        return result;
    };

    return {
        getAllPhotos : function(req, res) {
            Photo.find({}).sort({'globalDisplayOrder': 1}).exec(function(err, photos) {
                var result = _serializePhotos(photos);
                res.json(result);
            });
        },

        getPhoto : function(req, res) {
            Photo.findOne({_id : req.params.id}, function(err, photo) {
                if (err || !photo) {
                    res.json({success: false});
                } else {
                    var photoData = _serializePhoto(photos[i]);
                    res.json({
                        success : true,
                        data : photoData
                    });
                }
            });
        },

        createPhoto : function(req, res) {
            var newPhotos = [];
            for (var i = 0; i < req.files.length; i++) {
                var originalNameParts = req.files[i].originalname.split('.');
                var newPhoto = {};
                newPhoto.title = originalNameParts[0];
                newPhoto.url = "/images/" + req.files[i].filename;
                newPhoto.albumId = req.body.albumId;
                newPhoto.mimeType = req.files[i].mimetype;
                newPhotos.push(newPhoto);
            }

            Photo.find({}, function(err, photos) {
                var photosTotal = photos.length;
                Photo.find({albumId: req.body.albumId}, function(err, albumPhotos) {
                    var albumPhotosTotal = albumPhotos.length;
                    for (var i = 0; i < newPhotos.length; i++) {
                        newPhotos[i].globalDisplayOrder = photosTotal + i;
                        newPhotos[i].albumDisplayOrder = albumPhotosTotal + i;
                    }
                    Photo.collection.insert(newPhotos, function(err, createdPhotos) {
                        if (err) {
                            console.log(err);
                            res.json({success: false});
                        } else {
                            var result = _serializePhotos(createdPhotos);
                            res.json(result);
                        }
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
