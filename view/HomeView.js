const layout = require("./Layout");

module.exports = {
    render: renderView
};

function renderView(galleries)
{
    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: 'startPage',
        galleries: galleries.slice(0, Math.min(3, galleries.length))
    };

    return layout(data);
}