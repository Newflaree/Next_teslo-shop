import 'colors';
// Controllers
import { getProductsController } from './controllers';


export default function handler( req, res ) {
  switch ( req.method ) {
    case 'GET':
      return getProductsController( req, res );
  
    default:
      return res.status( 400 ).json({
        ok: false,
        message: 'Bad Request'
      });
  }
}
