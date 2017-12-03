const layout = require('./Layout');

function renderSingleGallery(gallery)
{
    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: 'gallery',
        gallery: gallery
    };
    return layout(data);
}

module.exports = {
    render : renderSingleGallery
};