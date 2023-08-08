// Services
import { getProductsService } from '../services';


/**
 * Handler description
 *
 * PATH: /api/...
 * AUTH-REQUIRED: false
 * ADMIN-REQUIRED: false
 *
 * @param { Object } req - The HTTP request object.
 * @param { Object } res - The HTTP response object.
 * @returns { void }
 */
const getProductsController = async ( req, res ) => {
  try {
    const { products } = await getProductsService( req );

    res.status( 200 ).json({
      ok: true,
      products
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.GET-PRODUCTS]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default getProductsController;
