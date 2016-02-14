import express from 'express';
import models from '../models';
import { ResourceNotFoundException } from '../exceptions';
import wrapper from '../utils/wrapper';

const router = express.Router();

router.get('/', wrapper(async (req, res) => {
  const users = await models.Users.findAndCountAll();
  res.json(users);
}));

//@formatter:off
/**
 @swagger
 /v1/users/{userId}:
   get:
     summary: Get single user
     description: |
       abc
     parameters:
       - name: userId
         in: path
         description: User Id
         required: true
         type: number
         format: integer
     responses:
       200:
         schema:
           type: array
           items:
             $ref: '#/definitions/Users'
 @throws {ResourceNotFoundException} When user not exist
 */
//@formatter:on
router.get('/:id', wrapper(async (req, res) => {
  const id = req.params.id;
  const user = await models.Users.findById(id);
  if (!user) {
    throw new ResourceNotFoundException('User not found');
  }
  res.json(user);
}));

module.exports = router;
