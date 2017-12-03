const express = require('express');
const hbs = require('handlebars');
const util = require('util');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./router');
//#TODO Should disappear at the end of the project
const layout = require('./view/Layout');
const galleries = require('./model/GalleryModel');

const app = express();

app.use(express.static('public'));

router(app);

app.use('/shopping-cart', cookieParser());
app.post('/shopping-cart/add', bodyParser.urlencoded({ extended: true }));
app.post('/shopping-cart/add', (req, res) => {
    const newlyAddedImgId = req.body.imgId;
    const alreadyAddedImages = req.cookies.shoppingCart || [];
    const imageNotYetAdded = !alreadyAddedImages.includes(newlyAddedImgId);
    if (imageNotYetAdded) {
        alreadyAddedImages.push(newlyAddedImgId);
    }
    res.cookie('shoppingCart', alreadyAddedImages, {httpOnly: true});

    const returnUri = req.body.returnUri || '/';
    res.redirect(302, returnUri);
});

app.get('/shopping-cart', (req, res) => {
    const imagesInCart = req.cookies.shoppingCart || [];
    const images = [];
    imagesInCart.forEach(function(image) {
        const label = image.slice(image.lastIndexOf('/') + 1);
        images.push({
            imgUri: '/galleries/' + image,
            label: label
        });
    });

    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: 'shoppingCart',
        shoppingCart: {
            images: images,
            itemCount: imagesInCart.length
        }
    };
    res.send(layout(data));
});

// Custom 404
app.use((req, res) => {
    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: '404',
    };
    res.status(404).send(layout(data));
});

// Custom 500
app.use((err, req, res) => {
    console.log(`Unhandled error caught: [${err}]`);

    const now = new Date();
    const data = {
        currentYear: now.getFullYear(),
        bodyPartial: '500',
    };
    res.status(500).send(layout(data));
});

app.listen(3000, () => console.log('Photopick listening on port 3000!'));