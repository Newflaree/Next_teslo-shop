// React
import { useContext, useEffect } from 'react';
// Next.js
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// Material UI
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Grid,
  Typography
} from '@mui/material';
// JS Cookie
import Cookies from 'js-cookie';
//
// Components
import {
  CartList,
  CartOrderSumary
} from '@/components/cart';
// Context
import { CartContext } from '@/context';
// Layouts
import { ShopLayout } from '@/components/layouts';
// Utils
import { countries } from '@/utils';


const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress, numberOfItems, createOrder } = useContext( CartContext );

  useEffect( () => {
    if ( !Cookies.get( 'firstName' ) ) {
      router.push( '/checkout/address' );
    }
  }, [ router ] );

  const onCreateOrder = () => {
    createOrder();
  }

  if ( !shippingAddress ) return <></>;

  const {
    firstName,
    lastName,
    address,
    address2,
    zip,
    city,
    country,
    phone
  } = shippingAddress;

  return (
    <ShopLayout
      title='Resumen de orden'
      pageDescription='Resumen de la orden'
    >
      <Typography
        variant='h1'
        component='h1'
      >
        Resumen de la orden
      </Typography>

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
              <Typography variant='h2'>
                Resumen ( { numberOfItems } { numberOfItems === 1 ? 'producto' : 'productos' } )
              </Typography>
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

              <Typography>{ `${ firstName } ${ lastName }` }</Typography>
              <Typography>{ address }</Typography>
              {
                address2 && (
                  <Typography>{ address2 }</Typography>
                )
              }
              <Typography>{ city }, { zip }</Typography>
              <Typography>{ countries.find( c => c.code === country )?.name }</Typography>
              <Typography>{ phone }</Typography>

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
                <Button
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                  onClick={ onCreateOrder }
                >
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export default SummaryPage;
