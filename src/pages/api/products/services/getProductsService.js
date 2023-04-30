// Models
import { Product } from '@/models';


const getProductsService = async () => {
  try {
    const products = await Product.find()
      .select( 'title images price inStock slug -_id' )
      .lean()

    return {
      products
    }
  } catch ( error ) {
    console.log( `${ '[SERVICE.GET-PRODUCTS]'.bgRed }: ${ error }` );
  }
}

export default getProductsService;
