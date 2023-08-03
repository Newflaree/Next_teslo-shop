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
const getUsersService = async () => {
  try {
    await db.connect();
    const users = await User.find().select( '-password' ).lean();
    await db.disconnect();

    return {
      users
    }
  } catch ( error ) {
    console.log( `${ '[SERVICE.GET-USERS]'.bgRed }: ${ error }` );
  }
}

export default getUsersService;
