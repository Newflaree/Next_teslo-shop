// Database
import { db } from '@/database';
// Models


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const createOrderService = async ( req ) => {
  const body = req.body;

  try {
    return {
      body
    }
  } catch ( error ) {
    await db.disconnect();

    console.log( `${ '[SERVICE.GET-PRODUCTS]'.bgRed }: ${ error }` );
  }
}

export default createOrderService;
