const express = require('express');
const router = express.Router();

const config = require('config');
const validUrl = require('valid-url');
const shortId = require('shortid');

const Url = require('../models/Url');

// @route    POST /api/url/short
// @desc     Create short URL

router.post('/short', async (req, res) => {
    const { longUrl } = req.body;
    //console.log(req.body);

    const baseUrl = config.get('baseUrl');

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid config base URL');


    }
    //Create URL shorten code
    const urlCode = shortId.generate();

    //Check if long url is valid
    if(validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if(url) {
                res.json(url);
            } else{
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save();
                res.json(url);

            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json('Server: something wrong!')
        }

    } else {
        res.status(401).json('Invalid long url')

    }


});

module.exports = router;