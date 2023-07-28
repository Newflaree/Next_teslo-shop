// Database
import { db } from '@/database';
// Models
import { Product } from '@/models';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const getTotalProductsService = async () => {
  try {
    await db.connect();
    const totalProducts = await Product.countDocuments();
    await db.disconnect();

    return totalProducts;

  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.GET-PRODUCTS-WITH-LOW-INVENTARY]'.bgRed }: ${ error }` );
  }
}

export default getTotalProductsService;
