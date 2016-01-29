import express      from 'express';
import models       from '../models';
import wrapper      from '../utils/wrapper';

let router = express.Router();

router.get('/', wrapper(async (req, res, next) => {
    //throw new Error('abc');
    let user = await models.WalletUsers.findOne();
    console.log(user)
    res.send('respond with a resource');
}));

module.exports = router;
