// Mongoose
import { isValidObjectId } from 'mongoose';
// Database
import { db } from '@/database';
// Models
import { User } from '@/models';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const updateUserService = async ( req ) => {
  const { userId = '', role = '' } = req.body;

  if ( !isValidObjectId( userId ) ) return {
    statusCode: 400,
    ok: false,
    message: 'There is no mongo id'
  }

  const validRoles = [ 'ADMIN_ROLE' ];

  if ( !validRoles.includes( role ) ) return {
    statusCode: 401,
    ok: false,
    message: 'Invalid role'
  }

  try {
    await db.connect();
    const user = await User.findById( userId );

    if ( !user ) return {
      statusCode: 404,
      ok: false,
      message: 'There is no user with that id'
    }

    user.role = role;
    await user.save();
    await db.disconnect();

    return {
      statusCode: 200,
      ok: true,
      message: 'Updated user'
    }

  } catch ( error ) {
    console.log( `${ '[SERVICE.UPDATE-USER]'.bgRed }: ${ error }` );
  }
}

export default updateUserService;
