// Services

import {getUsersService} from "../services";


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
const getUsersController = async ( req, res ) => {
  try {
    const { users } = await getUsersService();

    res.status( 200 ).json({
      ok: true,
      users
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.GET-USERS]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default getUsersController;
