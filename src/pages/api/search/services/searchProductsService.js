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
const searchProductsService = async ( req ) => {
  let { q = '' } = req.query;

  if ( q.length === 0 ) {
    return {
      statusCode: 400,
      ok: false,
      message: 'Debe de especificar el query de búsqueda'
    }
  }

  q = q.toString().toLowerCase();

  try {
    const searchedProducts = await Product.find({
      $text: { $search: q }
    })
      .select( 'title images price inStock slug -_id' )
      .lean();

    return {
      statusCode: 200,
      ok: true,
      searchedProducts
    }
  } catch ( error ) {
    console.log( `${ '[SERVICE.GET-PRODUCTS]'.bgRed }: ${ error }` );
  }
}

export default searchProductsService;
