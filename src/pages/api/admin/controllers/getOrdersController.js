// Serivices
import {
  getAllOrdersService,
  getNotPaidOrdersService,
  getPaidOrdersService,
  getProductsWithLowInventaryService,
  getProductsWithNoInventaryService,
  getTotalClientsService,
  getTotalProductsService
} from '../services';


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
const getOrdersController = async ( req, res ) => {
  try {
    /*
    const { totalOrders } = await getAllOrdersService();
    const { paidOrders } = await getPaidOrdersService();
    const { notPaidOrders } = await getNotPaidOrdersService();
    const { totalClients } = await getTotalClientsService();
    const { totalProducts } = await getTotalProductsService();
    const { productsWithNoInventary } = await getProductsWithNoInventaryService();
    const { productsWithLowInventary } = await getProductsWithLowInventaryService();
      * */

    const [
      totalOrders,
      paidOrders,
      notPaidOrders,
      totalClients,
      totalProducts,
      productsWithNoInventary,
      productsWithLowInventary
    ] =await Promise.all([
      getAllOrdersService(),
      getPaidOrdersService(),
      getNotPaidOrdersService(),
      getTotalClientsService(),
      getTotalProductsService(),
      getProductsWithNoInventaryService(),
      getProductsWithLowInventaryService()
    ]);

    res.status( 200 ).json({
      ok: true,
      totalOrders,
      paidOrders,
      notPaidOrders,
      totalClients,
      totalProducts,
      productsWithNoInventary,
      productsWithLowInventary
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.GET-ORDERS]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talking the Administrator'
    });
  }
}

export default getOrdersController;
