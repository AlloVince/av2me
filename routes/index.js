import express from 'express';
import request from 'request';
let router = express.Router();

async function sleep(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

/* GET home page. */
router.get('/', async (req, res, next) => {
    console.log('Do some thing, ' + new Date());
    await sleep(3000);
    console.log('Do other things, ' + new Date());
    res.render('index', {title: 'Express'});
});

module.exports = router;