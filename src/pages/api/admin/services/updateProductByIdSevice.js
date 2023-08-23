// Mongoose
import { isValidObjectId } from 'mongoose';
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
const updateProductByIdService = async ( req ) => {
  const { _id = '', images = [] } = req.body;

  if ( !isValidObjectId( _id ) ) return {
    statusCode: 400,
    ok: false,
    message: 'El id del producto no es válido'
  }

  if ( images.leght < 2 ) return {
    statusCode: 400,
    ok: false,
    message: 'Es necesario al menos 2 imágenes'
  }

  try {
    await db.connect();
    const product = await Product.findById( _id );

    if ( !product ) {
      await db.disconnect();
      return {
        statusCode: 400,
        ok: false,
        message: 'No existe un producto con ese id'
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate( _id, req.body, { new: true } );

    // TODO: Eliminar fotos en Cloudinary

    await db.disconnect();

    return {
      statusCode: 200,
      ok: true,
      updatedProduct
    }
  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.UPDATE-PRODUCT-BY-ID]'.bgRed }: ${ error }` );
  }
}

export default updateProductByIdService;
