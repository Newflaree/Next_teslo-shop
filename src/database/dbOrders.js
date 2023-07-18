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

export const getOrdersByUser = async ( userId = '' ) => {
  try {
    if ( !isValidObjectId( userId ) ) return [];

    await db.connect();
    const orders = await Order.find({ user: userId.toString() })
      .lean();
    await db.disconnect();

    if ( !orders ) return {
      ok: false,
      msg: 'Something went wrong'
    };


    return JSON.parse( JSON.stringify({ orders }) );
  
  } catch ( error ) {
    await db.disconnect();
  }
}
