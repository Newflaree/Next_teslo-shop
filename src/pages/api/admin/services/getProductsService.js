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
const getProductsService = async ( req ) => {
  try {
    await db.connect();
    const products = await Product.find()
      .sort({ title: 'asc' })
      .lean();
    await db.disconnect();

    // TODO: Update images

    return {
      ok: true,
      products
    }
  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.GET-PRODUCTS]'.bgRed }: ${ error }` );
  }
}

export default getProductsService;
