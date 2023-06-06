// Next.js
import NextLink from 'next/link';
// Next Auth
import { getSession } from 'next-auth/react';
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
  CreditScoreOutlined
} from '@mui/icons-material';
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
  console.log({ currentOrder });

  return (
    <ShopLayout
      title='Resumen de la orden 123451234'
      pageDescription='Resumen de la orden'
    >
      <Typography
        variant='h1'
        component='h1'
      >
        Orden: ABC123
      </Typography>

      <Chip
        label='Pagada con éxito'
        variant='outlined'
        color='success'
        icon={ <CreditScoreOutlined /> }
        sx={{
          my: 2
        }}
      />

        {
          /*
      <Chip
        label='Pendiente de pago'
        variant='outlined'
        color='error'
        icon={ <CreditCardOutlined /> }
        sx={{
          my: 2
        }}
      />
            * */
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
          <CartList />
        </Grid>
        <Grid
          item
          xs={ 12 }
          sm={ 5 }
        >
          <Card className='sumary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ( 3 productos )</Typography>
              <Divider sx={{ my: 1 }} />

              <Box
                display='flex'
                justifyContent='space-between'
              >
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                <NextLink
                  href='/checkout/address'
                  passHref
                  legacyBehavior
                >
                  <Link
                    color='rgba(0,0,0)'
                    underline='always'
                  >
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <Typography>Camilo López</Typography>
              <Typography>323 Algún lugar</Typography>
              <Typography>Stitteville, HYA 235</Typography>
              <Typography>Canadá</Typography>
              <Typography>+1 73122332</Typography>

              <Divider sx={{ my: 1 }} />

              <Box
                display='flex'
                justifyContent='end'
              >
                <NextLink
                  href='/cart'
                  passHref
                  legacyBehavior
                >
                  <Link
                    color='rgba(0,0,0)'
                    underline='always'
                  >
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <CartOrderSumary />

              <Box
                sx={{ mt: 3 }}
              >
                <h1>Pagar</h1>

                <Chip
                  label='Pagada con éxito'
                  variant='outlined'
                  color='success'
                  icon={ <CreditScoreOutlined /> }
                  sx={{
                    my: 2
                  }}
                />
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

  console.log({ currentOrder });
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
