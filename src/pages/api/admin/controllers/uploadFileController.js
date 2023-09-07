// Services
import { uploadFileService } from '../services';


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
const uploadFileController = async ( req, res ) => {
  try {
    const { message } = await uploadFileService( req );

    res.status( 200 ).json({
      ok: true,
      message
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.UPLOAD-FILE]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default uploadFileController;
