const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');

const layout = readTemplates();

function readTemplates()
{
    readPartials();
    return readHomeTemplate();
}

function readHomeTemplate()
{
    basePath = 'templates';
    return hbs.compile(fs.readFileSync(path.join(basePath, 'home.hbs'), 'utf8'));
}

function readPartials()
{
    basePath = 'templates/partials/'
    fileNames = fs.readdirSync(basePath,'utf8');

    fileNames.forEach(function(fileName){
       partialName = fileName.split('.')[0];

       hbs.registerPartial(partialName, fs.readFileSync(path.join(basePath, fileName), 'utf8'));
    });
}

module.exports = layout;