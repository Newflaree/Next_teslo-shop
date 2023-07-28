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
const getProductsWithLowInvertaryService = async () => {
  try {
    await db.connect();
    const totalProducts = await Product.find();
    await db.disconnect();

    const productsWithLowInventary = totalProducts.filter( product => {
      return product.inStock <= 10;
    });

    return productsWithLowInventary.length;

  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.GET-PRODUCTS-WITH-LOW-INVENTARY]'.bgRed }: ${ error }` );
  }
}

export default getProductsWithLowInvertaryService;
