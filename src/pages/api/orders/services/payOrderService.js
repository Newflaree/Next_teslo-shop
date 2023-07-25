// Database
import { db } from '@/database';
// Models
import { Order } from '@/models';
import axios from 'axios';


/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const payOrderService = async ( req ) => {
  try {
    const paypalBearerToken = await getPaypalBearerToken();

    if ( !paypalBearerToken ) return {
      statusCode: 401,
      ok: false,
      message: 'Could not confirm paypal token'
    }

    return {
      statusCode: 200,
      ok: true,
      message: paypalBearerToken
    }
  } catch ( error ) {
    await db.disconnect();

    console.log( `${ '[SERVICE.PAY-ORDER]'.bgRed }: ${ error }` );
  }
}

const getPaypalBearerToken = async () => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64Token = Buffer.from(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64');
  const body = new URLSearchParams( 'grant_type=client_credentials' );

  try {
    const { data } = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
      headers: {
        'Authorization': `Basic ${ base64Token }`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log({ data });

    return data.access_token;

  } catch ( error ) {
    ( axios.isAxiosError( error ) ) 
      ? console.log( `${ '[SERVICE.GET-PAYPAL-BEARER-TOKEN]'.bgRed }: ${ error }` )
      : console.log( `${ '[SERVICE.GET-PAYPAL-BEARER-TOKEN]'.bgRed }: ${ error }` );

    return null;
  
  }
}

export default payOrderService;
