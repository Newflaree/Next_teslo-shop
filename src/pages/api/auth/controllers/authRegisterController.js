// Services
import { authRegisterService } from '../services';


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
const authRegisterController = async ( req, res ) => {
  try {
    const {
      statusCode,
      ok,
      message,
      token,
      newUser
    } = await authRegisterService( req )

    res.status( statusCode ).json({
      ok,
      message,
      token,
      newUser
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.AUTH-REGISTER]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default authRegisterController;
