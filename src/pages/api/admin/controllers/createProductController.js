// Services
import { createProductService } from '../services';


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
const createProductController = async ( req, res ) => {
  try {
    const { statusCode, ok, message, product } = await createProductService( req );

    res.status( statusCode ).json({
      ok,
      message,
      product
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.CREATE-PRODUCT]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default createProductController;
