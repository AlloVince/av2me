import express from 'express';
import Model from 'sequelize/lib/model';
/** @type {Model} models.BlogPosts */
import models from '../models';
import { ResourceNotFoundException, InvalidArgumentException, UnauthorizedException, FormInvalidateException } from '../exceptions';
import wrapper from '../utils/wrapper';
import pagination from '../utils/pagination';

const router = express.Router();

//@formatter:off
/**
 @swagger
 /posts:
   get:
     summary: Get post list
     tags:
       - Posts
     parameters:
       - name: offset
         in: query
         description: Query offset
         required: false
         type: integer
         minimum: 0
         default: 0
       - name: limit
         in: query
         description: Query limit
         required: false
         type: integer
         minimum: 1
         maximum: 100
         default: 10
       - name: order
         in: query
         description: Query order
         required: false
         type: string
         default: -created_at
         enum:
           - -created_at
           - created_at
           - id
           - -id
     responses:
       200:
         schema:
           type: object
           required:
             - pagination
             - results
           properties:
             pagination:
               type: object
               items:
                 $ref: '#/definitions/Pagination'
             results:
               type: array
               items:
                 $ref: '#/definitions/BlogPosts'
 @throws {ResourceNotFoundException} When post not exist
 */
//@formatter:on
router.get('/', wrapper(async (req, res) => {
  let offset = parseInt(req.query.offset, 10) || 0;
  offset = offset < 0 ? 0 : offset;
  let limit = parseInt(req.query.limit, 10) || 10;
  limit = limit < 0 ? 0 : limit;
  limit = limit > 100 ? 100 : limit;
  const defaultOrder = '-created_at';
  let order = req.query.order || defaultOrder;
  const orders = {
    created_at: 'createdAt ASC',
    '-created_at': 'createdAt DESC',
    id: 'id ASC',
    '-id': 'id DESC'
  };
  order = orders.hasOwnProperty(order) ? orders[order] : orders[defaultOrder];
  const posts = await models.BlogPosts.findAndCountAll({
    offset,
    limit,
    order
  });
  return res.json({
    pagination: pagination({
      offset,
      limit,
      req,
      total: posts.count
    }),
    results: posts.rows
  });
}));

//@formatter:off
/**
 @swagger
 /posts/{postId}:
   get:
     summary: Get single post
     description: |
       abc
     tags:
       - Posts
     parameters:
       - name: postId
         in: path
         description: Post Id
         required: true
         type: integer
         minimum: 1
     responses:
       200:
         schema:
           type: object
           $ref: '#/definitions/BlogPosts'
 @throws {ResourceNotFoundException} When post not exist
 */
//@formatter:on
router.get('/:id', wrapper(async (req, res) => {
  const id = req.params.id;
  const post = await BlogPosts.findOne({
    where: {
      id
    },
    include: [
      {
        model: models.BlogTexts,
        as: 'text'
      },
      {
        model: models.BlogTags,
        as: 'tags'
      }
    ]
  });
  if (!post) {
    throw new ResourceNotFoundException('Post not found');
  }
  res.json(post);
}));

//@formatter:off
/**
 @swagger
 /posts/{postId}:
   put:
     summary: Update single post
     tags:
       - Posts
     parameters:
       - name: postId
         in: path
         description: User Id
         required: true
         type: number
         format: integer
       - name: body
         in: body
         description: Post info
         required: true
         schema:
           $ref: '#/definitions/BlogPosts'
     responses:
       200:
         schema:
           type: object
           $ref: '#/definitions/BlogPosts'
 @throws {UnauthorizedException}  Permission not allowed
 @throws {InvalidArgumentException}  Input invalided
 */
//@formatter:on
router.put('/:id', wrapper(async (req, res) => {
  const id = req.params.id;
  const input = req.body;
  //try {
  //  values = JSON.parse(input);
  //} catch (e) {
  //  throw new InvalidArgumentException('Input JSON format incorrect');
  //}
  //console.log(models.BlogPosts.validate(input));

  await models.BlogPosts.upsert(input);
  const post = await models.BlogPosts.findById(id);
  /*
  const post = await models.BlogPosts.findById(id);
  if (!post) {
    throw new ResourceNotFoundException('Post not found');
  }
  */
  res.json(post);
}));


//@formatter:off
/**
 @swagger
 /posts:
   post:
     summary: Create new post
     tags:
       - Posts
     parameters:
       - name: body
         in: body
         description: Post info
         required: true
         schema:
           $ref: '#/definitions/BlogPosts'
     responses:
       200:
         schema:
           type: object
           $ref: '#/definitions/BlogPosts'
 @throws {UnauthorizedException}  Permission not allowed
 @throws {InvalidArgumentException}  Input invalided
 */
//@formatter:on
router.post('/', wrapper(async (req, res) => {
  const input = req.body;
  const errors = await models.BlogPosts.build(input).validate();
  if (errors) {
    console.log(errors)
    throw new FormInvalidateException(errors);
  }
  const post = await models.BlogPosts.create(input);
  res.json(post);
}));

module.exports = router;
