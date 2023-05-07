// Database
import { db } from '@/database';
// Models
import { User } from '@/models';
// Utils
import { jwt } from '@/utils';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const validateTokenService = async ( req ) => {
  const { token = '' } = req.cookies;

  let userId = '';

  try {
    userId = await jwt.isValidToken( token );

    if ( !userId ) return {
      statusCode: 401,
      ok: false,
      message: 'Token de autorización no es válido'
    }

    await db.connect();
    const connectedUser = await User.findById( userId )
      .lean();
    await db.disconnect();

    if ( !connectedUser ) return {
      statusCode: 400,
      ok: false,
      message: 'No existe un usuario con ese ID'
    }

    const { _id, email, role, name } = connectedUser;

    return {
      statusCode: 200,
      ok: true,
      token: jwt.signToken( _id, email ),
      connectedUser: {
        email,
        role,
        name
      }
    }
  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.VALIDATE-TOKEN]'.bgRed }: ${ error }` );

    return {
      statusCode: 401,
      ok: false,
      message: 'Token de autorización no es válido'
    }
  }
}

export default validateTokenService;
