// Next Auth
import { getServerSession } from 'next-auth';
// Next Auth Options
import { authOptions } from '../../auth/[...nextauth]';
// Database
import { db } from '@/database';
// Models
import { Order, Product } from '@/models';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const createOrderService = async ( req, res ) => {
  const { orderItems, total } = req.body;

  try {
    const session = await getServerSession( req, res, authOptions );

    if ( !session ) return {
      statusCode: 401,
      ok: false,
      message: 'Debe de estar autenticado para hacer esto'
    }

    const idProducts = orderItems.map( product => product._id );

    await db.connect();
    const dbProducts = await Product
      .find({ _id: {  $in: idProducts } })
      .lean();

    const subTotal = orderItems.reduce( ( prev, current ) => {
      const currentPrice = dbProducts.find( prod => prod._id.toString() === current._id ).price;

      if ( !currentPrice ) return {
        statusCode: 400,
        ok: false,
        message: 'Verifique el carrito de nuevo'
      } 

      return ( currentPrice * current.quantity ) + prev;
    }, 0 );
    
    const taxRate = Number( process.env.NEXT_PUBLIC_TAX_RATE || 0 );
    const backendTotal = subTotal * ( taxRate + 1 );

    if ( total !== backendTotal ) return {
      statusCode: 400,
      ok: false,
      message: 'El total no cuadra con el monto'
    } 

    const userId = session.user._id;
    const newOrder = new Order({
      ...req.body,
      subtotal: subTotal,
      isPaid: false,
      user: userId ,
    });

    newOrder.total = Math.round( newOrder.total * 100 ) / 100;

    await newOrder.save();
    await db.disconnect();
    
    return {
      statusCode: 201,
      ok: true,
      newOrder
    }
  } catch ( error ) {
    await db.disconnect();

    console.log( `${ '[SERVICE.GET-PRODUCTS]'.bgRed }: ${ error }` );
  }
}

export default createOrderService;
