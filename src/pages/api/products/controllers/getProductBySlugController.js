// Database
import { db } from '@/database';
// Services
import { getProductBySlugService } from '../services';



/**
 * Handle a GET request to get a product by slug.
 *
 * PATH: /api/products/[slug]
 * AUTH-REQUIRED: false
 * ADMIN-REQUIRED: false
 *
 * @param { Object } req - The HTTP request object.
 * @param { Object } res - The HTTP response object.
 * @returns { void }
 */
const getProductBySlugController = async ( req, res ) => {
  try {

    db.connect();

    const { statusCode, ok, message, productBySlug } = await getProductBySlugService( req );

    db.disconnect();

    res.status( statusCode ).json({
      ok,
      message,
      productBySlug
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.GET-PRODUCT-BY-SLUG]'.bgRed }: ${ error }` );
  }
}

export default getProductBySlugController;
