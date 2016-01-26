import express      from 'express';
import models       from '../models';
let router = express.Router();

router.get('/', async (req, res, next) => {
    let user = await models.WalletUsers.findOne();
    console.log(user)
    res.send('respond with a resource');
});

module.exports = router;
