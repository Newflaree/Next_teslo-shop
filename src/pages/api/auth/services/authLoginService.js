import bcrypt from 'bcryptjs';
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
const authLoginService = async ( req ) => {
  const { email = '', password = '' } = req.body;

  try {
    await db.connect();
    const registeredUser = await User.findOne({ email })
    await db.disconnect();

    if ( !registeredUser ) return {
      statusCode: 401,
      ok: false,
      message: 'Correo electrónico o contraseña inválidos'
    };

    if ( !bcrypt.compareSync( password, registeredUser.password ) ) return {
      statusCode: 401,
      ok: false,
      message: 'Correo electrónico o contraseña inválidos'
    };

    const { _id, name, role } = registeredUser;

    const token = jwt.signToken( _id, email );

    return {
      statusCode: 200,
      ok: true,
      token,
      registeredUser: {
        email,
        name,
        role
      }
    }
  } catch ( error ) {
    await db.disconnect();

    console.log( `${ '[SERVICE.AUTH-LOGIN]'.bgRed }: ${ error }` );
  }
}

export default authLoginService;
