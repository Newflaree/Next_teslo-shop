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
const getPaidOrdersService = async () => {
  try {
    await db.connect();
    const paidOrders = await Order.countDocuments({ isPaid: true });
    await db.disconnect();

    return paidOrders;

  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.GET-PAID-ORDERS]'.bgRed }: ${ error }` );
  }
}

export default getPaidOrdersService;
