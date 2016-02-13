import express      from 'express';
import models       from '../models';
import wrapper      from '../utils/wrapper';

let router = express.Router();

router.get('/', wrapper(async (req, res, next) => {
  let user = await models.WalletUsers.findOne();
  console.log(user)
  throw new Error('abc');
  res.send('respond with a resource');
}));

module.exports = router;
