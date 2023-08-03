// Controllers
import { getUsersController, updateUserController } from './controllers';


export default function handler( req, res ) {
  switch ( req.method ) {
    case 'GET':
      return getUsersController( req, res );
  
    case 'PUT':
      return updateUserController( req, res );
  
    default:
      return res.status( 400 ).json({
        ok: false,
        message: 'Endpoint not implemented'
      });
  }
}
