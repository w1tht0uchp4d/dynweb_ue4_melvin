const galleries = require("../model/GalleryModel");
const homeView = require("../view/HomeView");

function handleGetHome(req, res)
{
    function generateResponse(galleries)
    {
        res.send(homeView.render(galleries));
    }

    galleries.getGalleries(generateResponse);
}

module.exports = {
    getHome: handleGetHome
};