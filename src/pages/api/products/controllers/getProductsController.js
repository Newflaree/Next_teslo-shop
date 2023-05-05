// Database
import { db } from '@/database';
// Services
import { getProductsService } from '../services';


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
const getProductsController = async ( req, res ) => {
  try {
    await db.connect();

    const { totalCountProducts, totalResponseProducts } = await getProductsService( req );

    await db.disconnect();

    res.status( 200 ).json({
      ok: true,
      totalCountProducts,
      totalResponseProducts
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.GET-PRODUCTS]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default getProductsController;
