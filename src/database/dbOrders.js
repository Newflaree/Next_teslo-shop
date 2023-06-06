// Mongoose
import { isValidObjectId } from 'mongoose';
// Database
import { db } from '.';
// Models
import { Order } from '@/models';


export const getOrderById = async ( id = '' ) => {
  try {
    if ( !isValidObjectId( id ) ) return null;

    await db.connect();
    const order = await Order.findById( id )
      .lean();
    await db.disconnect();

    if ( !order ) return null;

    return JSON.parse( JSON.stringify({ order }) );
  
  } catch ( error ) {
    await db.disconnect();
  }
}
