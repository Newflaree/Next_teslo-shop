// Database
import { db } from '.';
// Models
import { Product } from '@/models';


export const getAllProducts = async () => {
  try {
    await db.connect();
    const allProducts = await Product.find()
      .lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify( allProducts ) );
  
  } catch ( error ) {
    console.log( `${ '[CONFIG.DATABASE.GET-ALL-PRODUCTS]'.bgRed }: ${ error }` );
  }
}

export const getProductBySlug = async ( slug = '' ) => {
  try {
    await db.connect();
    const productBySlug = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if ( !productBySlug ) {
      return null;
    }

    // TODO: Procesamiento de las imágenes cuando se suban al server

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

export const getProductsBySearchTerm = async ( term = '' ) => {
  term = term.toString().toLowerCase();

  try {
    await db.connect();
    const searchedProducts = await Product.find({
      $text: { $search: term }
    })
      .select( 'title images price inStock slug -_id' )
      .lean();
    await db.disconnect();

    return searchedProducts;
  
  } catch ( error ) {
    console.log( `${ '[CONFIG.DATABASE.GET-PRODUCTS-BY-SEARCH-TERM]'.bgRed }: ${ error }` );
  }
}
