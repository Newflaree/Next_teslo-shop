// Database
import { SHOP_CONSTANTS } from '@/database';
// Models
import { Product } from '@/models';


/**
 * Service for retrieving products based on provided query parameters
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const getProductsService = async ( req ) => {
  const { gender = 'all' } = req.query;
  let condition = {};

  if ( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes( gender ) ) {
    condition = { gender }
  }

  try {
    const [ totalCountProducts, totalResponseProucts ] = await Promise.all([
      Product.countDocuments( condition ),
      Product.find( condition )
        .select( 'title images price inStock slug -_id' )
        .lean()
    ]);

    return {
      totalCountProducts,
      totalResponseProucts
    }
  } catch ( error ) {
    console.log( `${ '[SERVICE.GET-PRODUCTS]'.bgRed }: ${ error }` );
  }
}

export default getProductsService;
