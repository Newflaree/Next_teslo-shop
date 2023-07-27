// Next.js
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// Next Auth
import { getSession } from 'next-auth/react';
// Paypal
import { PayPalButtons } from '@paypal/react-paypal-js';
// Material UI
import {
  Box,
  Card,
  CardContent,
  Divider,
  Link,
  Grid,
  Typography,
  Chip
} from '@mui/material';
// Material Icons
import {
  CreditCardOutlined,
  CreditScoreOutlined
} from '@mui/icons-material';
// Api
import { tesloApi } from '@/api';
// Components
import {
  CartList,
  CartOrderSumary
} from '@/components/cart';
// Database
import { dbOrders } from '@/database';
// Layouts
import { ShopLayout } from '@/components/layouts';


const OrderPage = ({ currentOrder }) => {
  const router = useRouter();

  const {
    _id,
    isPaid,
    numberOfItems,
    orderItems,
    shippingAddress,
    total
  } = currentOrder;

  const onOrderCompleted = async ( details ) => {
    if ( details.status !== 'COMPLETED' ) return alert( 'There is no payment in Paypal' );

    try {
      const { data } = await tesloApi.post( `/orders/pay`, {
        transactionId: details.id,
        orderId: _id
      });
       
      router.reload();
    
    } catch ( error ) {
      console.log( error );
      alert( 'Error' );
    }
  }

  return (
    <ShopLayout
      title='Resumen de la orden'
      pageDescription='Resumen de la orden'
    >
      <Typography
        variant='h1'
        component='h1'
      >
        Orden: { _id }
      </Typography>

        {
          isPaid 
            ? (
              <Chip
                label='Pagada con éxito'
                variant='outlined'
                color='success'
                icon={ <CreditScoreOutlined /> }
                sx={{
                  my: 2
                }}
              />
            )
            : (
              <Chip
                label='Pendiente de pago'
                variant='outlined'
                color='error'
                icon={ <CreditCardOutlined /> }
                sx={{
                  my: 2
                }}
              />
            )
        }


      <Grid
        container
        mt={ 4 }
      >
        <Grid
          item
          xs={ 12 }
          sm={ 7 }
        >
          <CartList
            products={ orderItems }
          />
        </Grid>
        <Grid
          item
          xs={ 12 }
          sm={ 5 }
        >
          <Card className='sumary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ({ numberOfItems } { numberOfItems > 1 ? 'productos' : 'producto' })</Typography>
              <Divider sx={{ my: 1 }} />

              <Box
                display='flex'
                justifyContent='space-between'
              >
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
              </Box>

              <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
              <Typography>{ shippingAddress.address } { shippingAddress.address2 && `, ${ shippingAddress.address2 }` }</Typography>
              <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
              <Typography>{ shippingAddress.country }</Typography>
              <Typography>{ shippingAddress.phone }</Typography>

              <Divider sx={{ my: 1 }} />


              <CartOrderSumary
                orderValues={{
                  numberOfItems: currentOrder.numberOfItems,
                  subTotal: currentOrder.subtotal,
                  total: currentOrder.total,
                  tax: currentOrder.tax
                }}
              />

              <Box
                display='flex'
                flexDirection='column'
                sx={{ mt: 3 }}
              >

                {
                  isPaid 
                    ? (
                      <Chip
                        label='Pagada con éxito'
                        variant='outlined'
                        color='success'
                        icon={ <CreditScoreOutlined /> }
                        sx={{
                          my: 2
                        }}
                      />
                    )
                    : (
                      <PayPalButtons 
                        createOrder={ ( data, actions ) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: `${ total }`
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={ ( data, actions ) => {
                          return actions.order.capture().then( ( details ) => {
                            onOrderCompleted( details )
                            //const name = details.payer.name.given_name;
                            //alert( `Transaction completed by ${ name }` );
                          });
                        }}
                      />
                    )
                }
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export const getServerSideProps = async ({ req, query }) => {
  const { id = '' } = query;

  const session = await getSession({ req });

  if ( !session ) return {
    redirect: {
      destination: `/auth/login?page=/orders/${ id }`,
      permanent: false
    }
  }

  const currentOrder = await dbOrders.getOrderById( id.toString() );

  if ( !currentOrder ) return {
    redirect: {
      destination: '/orders/history',
      permanent: false
    }
  }

  if ( session.user._id !== currentOrder.order.user ) return {
    redirect: {
      destination: '/orders/history',
      permanent: false
    }
  }


  return {
    props: {
      currentOrder: currentOrder.order
    },
  }
}

export default OrderPage;
