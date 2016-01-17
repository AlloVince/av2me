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

async function getMovies() {
    return new Promise(function(resolve, reject) {
        request('https://api.douban.com/v2/movie/top251', function(error, response, body) {
            if (error) return reject(error);
            resolve(JSON.parse(body));
        });
    });
}

/* GET home page. */
router.get('/', async (req, res, next) => {
    console.log('Do some thing, ' + new Date());
    let moveis = await getMovies();
    console.log(moveis);
    res.render('index', {title: 'Express'});
});

module.exports = router;