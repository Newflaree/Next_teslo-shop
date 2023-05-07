// Services
import { validateTokenService } from '../services';


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
const validateTokenController = async ( req, res ) => {
  try {
    const {
      statusCode,
      ok,
      message,
      token,
      connectedUser
    } = await validateTokenService( req );

    res.status( statusCode ).json({
      ok,
      message,
      token,
      connectedUser
    });

  } catch ( error ) {
    console.log( `${ '[CONTROLLER.VALIDATE-TOKEN]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default validateTokenController;
