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
const createProductService = async ( req ) => {
  const { images = [] } = req.body;

  if ( images.length < 2 ) return {
    statusCode: 400,
    ok: false,
    message: 'El producto necesita al menos 2 imágenes'
  }

  try {
    await db.connect();
    const slugProductExists = await Product.findOne({ slug: req.body.slug })

    if ( slugProductExists ) {
      await db.disconnect();
      return {
        statusCode: 400,
        ok: false,
        message: 'Ya existe un producto con ese slug'
      }
    }

    const product = new Product( req.body );
    await product.save();

    await db.disconnect();

    return {
      statusCode: 201,
      ok: true,
      product
    }
  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.CREATE-PRODUCT]'.bgRed }: ${ error }` );
  }
}

export default createProductService;
