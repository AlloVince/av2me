import express from 'express';
import request from 'request';
import wrapper      from '../utils/wrapper';
let router = express.Router();

/**
 * abc
 * @param a
 * @param b
 * @returns {Promise}
 * @swagger
 * PriceEstimate:
 *   properties:
 *     product_id:
 *       type: string
 *       description: Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles
 *     currency_code:
 *       type: string
 *       description: "[ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code."
 *     display_name:
 *       type: string
 *       description: Display name of product.
 *     estimate:
 *       type: string
 *       description: Formatted string of estimate in local currency of the start location. Estimate could be a range, a single number (flat rate) or "Metered" for TAXI.
 *     low_estimate:
 *       type: number
 *       description: Lower bound of the estimated price.
 *     high_estimate:
 *       type: number
 *       description: Upper bound of the estimated price.
 *     surge_multiplier:
 *       type: number
 *       description: Expected surge multiplier. Surge is active if surge_multiplier is greater than 1. Price estimate already factors in the surge multiplier.
 */
async function getMovies(a, b) {
    return new Promise((resolve, reject) => {
        request('https://api.douban.com/v2/movie/top251', (error, response, body) => {
            if ( error ) return reject(error);
            resolve(JSON.parse(body));
        });
    });
}

/**
  @swagger
 /estimates/price:
   get:
     summary: Price Estimates
     description: |
       The Price Estimates endpoint returns an estimated price range
       for each product offered at a given location. The price estimate is
       provided as a formatted string with the full price range and the localized
       currency symbol.<br><br>The response also includes low and high estimates,
       and the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code for
       situations requiring currency conversion. When surge is active for a particular
       product, its surge_multiplier will be greater than 1, but the price estimate
       already factors in this multiplier.
     parameters:
       - name: start_latitude
         in: query
         description: Latitude component of start location.
         required: true
         type: number
         format: double
       - name: start_longitude
         in: query
         description: Longitude component of start location.
         required: true
         type: number
         format: double
       - name: end_latitude
         in: query
         description: Latitude component of end location.
         required: true
         type: number
         format: double
       - name: end_longitude
         in: query
         description: Longitude component of end location.
         required: true
         type: number
         format: double
     tags:
       - Estimates
     responses:
       200:
         description: An array of price estimates by product
         schema:
           type: array
           items:
             $ref: '#/definitions/PriceEstimate'
       default:
         description: Unexpected error
         schema:
           $ref: '#/definitions/Error'
 */
router.get('/', wrapper(async (req, res, next) => {
    //console.log('Do some thing, ' + new Date());
    //let moveis = await getMovies();
    //console.log(moveis);
    res.render('index', {title: 'Express'});
}));


/**
  @swagger
 Error:
   properties:
     code:
       type: integer
       format: int32
     message:
       type: string
     fields:
       type: string
*/
module.exports = router;