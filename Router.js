/*
Es ist gängige Praxis, dass das Routing Modul im Top Level Verzeichnis verwaltet
 */
const layout = require("./view/Layout");
const galleries = require("./model/GalleryModel");
const homeController = require("./controller/HomeController");
const galleryController = require("./controller/GalleryController");

module.exports = function(app)
{
    app.get('/', homeController.getHome);
    app.get('/galleries', galleryController.getAllGalleries);
    app.get('/galleries/:galleryKey', galleryController.getSingleGallery);
};