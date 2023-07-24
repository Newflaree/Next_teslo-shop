// Database
import { db } from '@/database';
// Models
import { Order } from '@/models';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const payOrderService = async ( req ) => {
  try {
    return {
      message: 'payOrderService'
    }
  } catch ( error ) {
    await db.disconnect();

    console.log( `${ '[SERVICE.PAY-ORDER]'.bgRed }: ${ error }` );
  }
}

export default payOrderService;
