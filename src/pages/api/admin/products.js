// Controllers
import { getAdminProductsController } from './controllers';


export default function handler( req, res ) {
  switch ( req.method ) {
    case 'GET':
      return getAdminProductsController( req, res );
  
    case 'POST':
      return method( req, res );
  
    case 'PUT':
      return method( req, res );
  
    default:
      return res.status( 400 ).json({
        ok: false,
        message: 'Endpoint not implemented'
      });
  }
}
