// Database
import { db } from '@/database';
// Services
import { searchProductsService } from '../services';


/**
 * Handle a GET request to get all products with any query.
 *
 * PATH: /api/products
 * AUTH-REQUIRED: false
 * ADMIN-REQUIRED: false
 *
 * @param { Object } req - The HTTP request object.
 * @param { Object } res - The HTTP response object.
 * @returns { void }
 */
const searchProductsController = async ( req, res ) => {
  try {
    await db.connect();

    const { statusCode, ok, message, searchedProducts } = await searchProductsService( req );

    await db.disconnect();

    res.status( statusCode ).json({
      ok,
      message,
      searchedProducts
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.GET-PRODUCTS]'.bgRed }: ${ error }` );
  }
}

export default searchProductsController;
