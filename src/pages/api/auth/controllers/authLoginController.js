// Services
import { authLoginService } from '../services';


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
const authLoginController = async ( req, res ) => {
  try {
    const {
      statusCode,
      ok,
      message,
      token,
      registeredUser
    } = await authLoginService( req );

    res.status( statusCode ).json({
      ok,
      message,
      token,
      registeredUser
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.AUTH-LOGIN]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default authLoginController;
