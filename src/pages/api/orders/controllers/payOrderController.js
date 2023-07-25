// Services
import { payOrderService } from '../services';


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
const payOrderController = async ( req, res ) => {
  try {
    const { statusCode, ok, message } = await payOrderService( req );

    res.status( statusCode ).json({
      ok,
      message
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.PAY-ORDER]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default payOrderController;
