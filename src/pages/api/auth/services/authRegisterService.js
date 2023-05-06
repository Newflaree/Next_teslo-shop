// Bcrypt
import bcrypt from 'bcryptjs';
// Database
import { db } from '@/database';
// Models
import { User } from '@/models';
// Utils
import { jwt, validation } from '@/utils';


/**
 * Service Description: Register a new user in the system.
 *
 * @param {Object} req - Express request object containing user data in the request body (email, password, name).
 * @returns {Object} - An object containing the status code, success status, and a message or the newly registered user data and a JWT token.
 */
const authRegisterService = async ( req ) => {
  const { email = '', password = '', name = '' } = req.body;

  if ( !validation.isValidEmail( email ) ) return {
    statusCode: 400,
    ok: false,
    message: 'El correo electrónico no tiene un formato permitido'
  }

  if ( password.length < 6 ) return {
    statusCode: 400,
    ok: false,
    message: 'La contraseña debe de tener al menos 6 carácteres'
  }

  if ( name.length < 3 ) return {
    statusCode: 400,
    ok: false,
    message: 'El nombre debe de tener al menos 2 carácteres'
  }

  try {
    await db.connect();
    const registeredUser = await User.findOne({ email });

    if ( registeredUser ) {
      await db.disconnect();

      return {
        statusCode: 400,
        ok: false,
        message: 'Ya existe un usuario con ese correo electrónico'
      }
    }

    const newUser = new User({
      email: email.toLowerCase(),
      password: bcrypt.hashSync( password ),
      name,
      role: 'CLIENT_ROLE'
    });

    await newUser.save();
    await db.disconnect();

    const { _id, role } = newUser;
    const token = jwt.signToken( _id, email );

    return {
      statusCode: 201,
      ok: true,
      token,
      newUser: {
        email,
        role,
        name
      }
    }
  } catch ( error ) {
    await db.disconnect();

    console.log( `${ '[SERVICE.AUTH-LOGIN]'.bgRed }: ${ error }` );
  }
}

export default authRegisterService;
