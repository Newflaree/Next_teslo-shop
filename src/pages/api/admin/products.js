// Controllers
import {
  createProductController,
  getAdminProductsController,
  updateProductByIdController
} from './controllers';


export default function handler( req, res ) {
  switch ( req.method ) {
    case 'GET':
      return getAdminProductsController( req, res );
  
    case 'POST':
      return createProductController( req, res );
  
    case 'PUT':
      return updateProductByIdController( req, res );
  
    default:
      return res.status( 400 ).json({
        ok: false,
        message: 'Endpoint not implemented'
      });
  }
}
