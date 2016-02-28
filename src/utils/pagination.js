const toUrl = (scheme, host, path, query = {}) => {
  let queryString = Object.keys(query)
    .map(key => `${key}=${query[key]}`)
    .join('&');
  queryString = queryString === '' ? '' : `?${queryString}`;
  return `${scheme}://${host}${path}${queryString}`;
};


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
  offsetNum,
  req
  }) => {
  const offset = offsetNum > total ? total : offsetNum;
  const next = offset + limit > total ? total : offset + limit;
  let prev = offset === 0 ? 0 : offset - limit;
  prev = next === total ? total - limit : prev;
  return {
    total,
    offset,
    limit,
    prev,
    next,
    prevUri: toUrl(
      req.protocol, req.get('host'), req.baseUrl, Object.assign(req.query, { offset: prev })
    ),
    nextUri: toUrl(
      req.protocol, req.get('host'), req.baseUrl, Object.assign(req.query, { offset: next })
    )
  };
};

export default pagination;
