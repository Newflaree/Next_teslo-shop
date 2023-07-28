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
const getTotalClientsService = async () => {
  try {
    await db.connect();
    const totalClients = await User.countDocuments({ role: 'CLIENT_ROLE' });
    await db.disconnect();

    return totalClients;

  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.GET-TOTAL-CLIENTS]'.bgRed }: ${ error }` );
  }
}

export default getTotalClientsService;
