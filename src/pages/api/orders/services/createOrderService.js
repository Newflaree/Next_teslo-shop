// Next Auth
import { getServerSession } from 'next-auth';
// Next Auth Options
import { authOptions } from '../../auth/[...nextauth]';
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
const createOrderService = async ( req, res ) => {
  const { orderItems, total } = req.body;

  try {
    // TODO: Verificar que tengamos un usuario
    const session = await getServerSession( req, res, authOptions );

    if ( !session ) return {
      statusCode: 401,
      ok: false,
      message: 'Debe de estar autenticado para hacer esto'
    }

    // TODO: Crear un arreglo con los productos que la persona tiene
    const idProducts = orderItems.map( product => product._id );

    await db.connect();
    const dbProducts = await Product
      .find({ _id: {  $in: idProducts } })
      .lean();

    const subTotal = orderItems.reduce( ( prev, current ) => {
      const currentPrice = dbProducts
        .find( prod => prod._id === current._id ).price;

      if ( !currentPrice ) throw new Error( 'Verifique el carrito de nuevo' );

      return ( currentPrice * current.quantity ) + prev;
    }, 0 );
    await db.disconnect();
    
    return {
      statusCode: 201,
      ok: true,
      message: 'dskafj'
    }
  } catch ( error ) {
    await db.disconnect();

    console.log( `${ '[SERVICE.GET-PRODUCTS]'.bgRed }: ${ error }` );
  }
}

export default createOrderService;
