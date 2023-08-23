// Services
import { updateProductByIdSevice } from '../services';


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
const updateProductByIdController = async ( req, res ) => {
  try {
    const {
      statusCode,
      ok,
      message,
      updatedProduct
    } = await updateProductByIdSevice( req );

    res.status( statusCode ).json({
      ok,
      message,
      updatedProduct
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.UPDATE-PRODUCT-BY-ID]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default updateProductByIdController;
