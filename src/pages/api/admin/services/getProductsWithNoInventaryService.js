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
const getProductsWithNoInvertaryService = async () => {
  try {
    await db.connect();
    const productsWithNoInventary = await Product.countDocuments({ inStock: 0 });
    await db.disconnect();

    return productsWithNoInventary;

  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.GET-PRODUCTS-WITH-NO-INVENTARY]'.bgRed }: ${ error }` );
  }
}

export default getProductsWithNoInvertaryService;
