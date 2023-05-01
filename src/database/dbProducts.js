// Database
import { db } from '.';
// Models
import { Product } from '@/models';

export const getProductBySlug = async ( slug = '' ) => {
  try {
    await db.connect();
    const productBySlug = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if ( !productBySlug ) {
      return null;
    }

    return JSON.parse( JSON.stringify( productBySlug ) );
  
  } catch ( error ) {
    console.log( `${ '[CONFIG.DATABASE.GET-PRODUCT-BY-SLUG]'.bgRed }: ${ error }` );
  }
}

export const getAllProductsSlugs = async () => {
  try {
    await db.connect();
    const slugs = await Product.find().select( 'slug -_id' ).lean();
    await db.disconnect();

    return slugs;
  } catch ( error ) {
    console.log( `${ '[CONFIG.DATABASE.GET-ALL-PRODUCT-SLUGS]'.bgRed }: ${ error }` );
  }
}


