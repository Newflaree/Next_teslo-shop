// Models
import { Product } from '@/models';


/**
 * A function that retrieves a product by its slug
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the status code, a boolean indicating success or failure, and either the product object or an error message
 */
const getProductBySlugService = async ( req ) => {
  const { slug } = req.query;

  try {
    const productBySlug = await Product.findOne({ slug });

    if ( !productBySlug ) {
      return {
        statusCode: 400,
        ok: false,
        message: 'Producto no encontrado'
      }
    }

    return {
      statusCode: 200,
      ok: true,
      productBySlug
    }
  } catch ( error ) {
    await db.disconnect();

    console.log( `${ '[SERVICE.GET-PRODUCT-BY-SLUG]'.bgRed }: ${ error }` );
  }
}

export default getProductBySlugService;
