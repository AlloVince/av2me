import express from 'express';
import request from 'request';
import wrapper      from '../utils/wrapper';
let router = express.Router();

async function getMovies() {
    return new Promise((resolve, reject) => {
        request('https://api.douban.com/v2/movie/top251', (error, response, body) => {
            if ( error ) return reject(error);
            resolve(JSON.parse(body));
        });
    });
}

router.get('/', wrapper(async (req, res, next) => {
    //console.log('Do some thing, ' + new Date());
    //let moveis = await getMovies();
    //console.log(moveis);
    res.render('index', {title: 'Express'});
}));

module.exports = router;