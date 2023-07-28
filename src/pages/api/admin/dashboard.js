// Controllers
import { getOrdersController } from './controllers';
/*
Data = {
  nomberOfOrders: number
  paidOrders: number // isPais true
  notPaidOrders: number
  numberOfClients: number // Solo rol de client
  numberOfProducts: number
  productsWithNoInventary: number // Productos con 0 unitsk
  lowInventory: number // Productos con menos de 10 unidades
}
  * */



export default function handler( req, res ) {
  switch ( req.method ) {
    case 'GET':
      return getOrdersController( req, res );
  
    default:
      return res.status( 400 ).json({
        ok: false,
        message: 'Endpoint not implemented'
      });
  }
}
