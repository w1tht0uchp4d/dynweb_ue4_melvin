const layout = require('./Layout');

function renderGalleries(galleries)
{
    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: 'allGalleries',
        galleries: galleries
    };

    return layout(data);
}

module.exports = {
  render : renderGalleries
};