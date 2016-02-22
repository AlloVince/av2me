import express from 'express';
import models from '../models';
import { ResourceNotFoundException, InvalidArgumentException } from '../exceptions';
import wrapper from '../utils/wrapper';

const router = express.Router();

//@formatter:off
/**
 @swagger
 /users:
   get:
     summary: Get user list
     tags:
       - Users
     parameters:
       - name: offset
         in: query
         description: Query offset
         required: false
         type: integer
       - name: limit
         in: query
         description: Query limit
         required: false
         type: integer
     responses:
       200:
         schema:
           type: object
           properties:
             results:
               type: array
               $ref: '#/definitions/Users'
 @throws {ResourceNotFoundException} When user not exist
 */
//@formatter:on
router.get('/', wrapper(async (req, res) => {
  const users = await models.Users.findAndCountAll();
  res.json(users);
}));

//@formatter:off
/**
 @swagger
 /users/{userId}:
   get:
     summary: Get single user
     description: |
       abc
     tags:
       - Users
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
           type: object
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

//@formatter:off
/**
 @swagger
 /users/{userId}:
   put:
     summary: Update single user
     description: |
       abc
     tags:
       - Users
     parameters:
       - name: userId
         in: path
         description: User Id
         required: true
         type: number
         format: integer
       - name: body
         in: body
         description: User info
         required: true
         schema:
           $ref: '#/definitions/Users'
     responses:
       200:
         schema:
           type: object
           $ref: '#/definitions/Users'
 @throws {ResourceNotFoundException} When user not exist
 @throws {InvalidArgumentException}  When input not valid
 */
//@formatter:on
router.put('/:id', wrapper(async (req, res) => {
  console.log(1);
  const id = req.params.id;
  console.log(id);
  const user = await models.Users.findById(id);
  if (!user) {
    throw new ResourceNotFoundException('User not found');
  }
  res.json(user);
}));

module.exports = router;
