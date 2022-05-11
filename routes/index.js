const express = require('express');
const router = express.Router();

const Url = require('../models/Url')

//@rout     GET /:code
//@desc     Redirect to original URL

router.get('/:code', async (req, res) =>{
    try {
        const url = await Url.findOne({urlCode: req.params.code});

        if(url){
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No URL found')
        }


    } catch (error) {   
        console.error(error);
        res.status(500).json('Something wrong!')
        
    }
})


module.exports = router;
