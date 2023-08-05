// Controllers
import { getOrdersDetailController } from './controllers';


export default function handler( req, res ) {
  switch ( req.method ) {
    case 'GET':
      return getOrdersDetailController( req, res );
  
    default:
      return res.status( 400 ).json({
        ok: false,
        message: 'Endpoint not implemented'
      });
  }
}
