// Services
import getOrdersDetailsService from "../services/getOrdersDetailService";


/**
 * Handler description
 *
 * PATH: /api/...
 * AUTH-REQUIRED: false
 * ADMIN-REQUIRED: false
 *
 * @param { Object } req - The HTTP request object.
 * @param { Object } res - The HTTP response object.
 * @returns { void }
 */
const getOrdersDetailController = async ( req, res ) => {
  try {
    const { totalOrders } = await getOrdersDetailsService();

    res.status( 200 ).json({
      ok: true,
      totalOrders
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.GET-ORDERS-DETAILS]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default getOrdersDetailController;