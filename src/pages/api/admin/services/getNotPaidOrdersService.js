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
const getNotPaidOrdersService = async () => {
  try {
    await db.connect();
    const notPaidOrders = await Order.countDocuments({ isPaid: false });
    await db.disconnect();

    return notPaidOrders;

  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.GET-NOT-PAID-ORDERS]'.bgRed }: ${ error }` );
  }
}

export default getNotPaidOrdersService;
