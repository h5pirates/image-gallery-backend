var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest:'./public/images/' });

module.exports = function(Album, Photo) {
  var albumController = require('../app/controller/albumController')(Album, Photo);
  var photoController = require('../app/controller/photoController')(Album, Photo);

  // Album APIs
  router.get('/albums', albumController.getAllAlbums);
  router.get('/album/:id', albumController.getAlbum);
  router.post('/album', albumController.createAlbum);
  router.put('/album/:id/title', albumController.updateAlbumTitle);
  router.put('/album/:id/displayOrder', albumController.updateAlbumDisplayOrder);
  router.delete('/album/:id', albumController.deleteAlbum);

  // Photo APIs
  router.get('/photos', photoController.getAllPhotos);
  router.get('/photo/:id', photoController.getPhoto);
  router.post('/photo', upload.array('file', 10), photoController.createPhoto);
  router.put('/photo/:id/title', photoController.updatePhotoTitle);
  router.put('/photo/:id/album', photoController.updatePhotoAlbumId);
  router.put('/photo/:id/globalDisplayOrder', photoController.updatePhotoGlobalDisplayOrder);
  router.put('/photo/:id/albumDisplayOrder', photoController.updatePhotoAlbumDisplayOrder);
  router.delete('/photo/:id', photoController.deletePhoto);

  return router;
};

