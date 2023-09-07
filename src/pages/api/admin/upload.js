// Controllers
import { uploadFileController } from './controllers';
import formidable from 'formidable';

export default function handler( req, res ) {
  switch ( req.method ) {
    case 'POST':
      return uploadFileController( req, res );
  
    default:
      return res.status( 400 ).json({
        ok: false,
        message: 'Endpoint not implemented'
      });
  }
}
