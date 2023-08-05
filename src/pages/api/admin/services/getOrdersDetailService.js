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
const getOrdersDetailsService = async () => {
  try {
    await db.connect();
    const totalOrders = await Order.find()
      .sort({ createdAt: 'desc' })
      .populate( 'user', 'name email' )
      .lean();
    await db.disconnect();

    return {
      totalOrders
    };

  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.GET-ALL-ORDERS]'.bgRed }: ${ error }` );
  }
}

export default getOrdersDetailsService;
