import express from 'express';
import request from 'request';
import wrapper from '../utils/wrapper';
const router = express.Router();

async function getMovies() {
  return new Promise((resolve, reject) => {
    request('https://api.douban.com/v2/movie/top251', (error, response, body) => {
      if (error) return reject(error);
      resolve(JSON.parse(body));
    });
  });
}

router.get('/', wrapper(async (req, res, next) => {
  res.render('index', { title: 'Express' });
}));

module.exports = router;
