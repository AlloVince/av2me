//@formatter:off
/**
 @swagger
 Pagination:
   type: object
   properties:
     count:
       type: integer
       description: 总数据量
     offset:
       type: integer
       description: 偏移量
     limit:
       type: integer
       description: 单页数据量
     prev:
       type: integer
       description: 上页偏移量
     next:
       type: integer
       description: 下页偏移量
 */
//@formatter:on
const pagination = ({
  total,
  limit,
  offset,
  req,
  limitKeyword='limit',
  offsetKeyword='offset'
  }) => {
  offset = offset > total ? total : offset;
  let prev = offset === 0 ? 0 : offset - limit;
  let next = offset + limit > total ? total : offset + limit;
  prev = next === total ? total - limit : prev;
  return {
    total,
    offset,
    limit,
    prev,
    next
  };
};

export default pagination;
