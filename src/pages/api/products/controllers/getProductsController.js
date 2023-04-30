// Database
import { db } from '@/database';
// Services
import { getProductsService } from '../services';


const getProductsController = async ( req, res ) => {
  try {
    await db.connect();

    const { products } = await getProductsService();

    await db.disconnect();

    res.status( 200 ).json({
      ok: true,
      products
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.GET-PRODUCTS]'.bgRed }: ${ error }` );
  }
}

export default getProductsController;
