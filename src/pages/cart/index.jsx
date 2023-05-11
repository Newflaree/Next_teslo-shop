// React
import { useContext, useEffect } from 'react';
// Next.js
import { useRouter } from 'next/router';
// Material UI
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
// Components
import { CartList, CartOrderSumary } from '@/components/cart';
// Context
import { CartContext } from '@/context';
// Layouts
import { ShopLayout } from '@/components/layouts';


const CartPage = () => {
  const { isLoaded, cart } = useContext( CartContext )
  const router = useRouter();

  useEffect( () => {
    if ( isLoaded && cart.length === 0 ) {
      router.replace( '/cart/empty' )
    }
  }, [isLoaded, cart, router] )

  if ( !isLoaded || cart.length === 0 ) {
    return ( <></> )
  }

  return (
    <ShopLayout
      title='Carrito - 2'
      pageDescription='Carrio de compras de la tienda'
    >
      <Typography
        variant='h1'
        component='h1'
      >
        Carrito
      </Typography>
      <Grid
        container
      >
        <Grid
          item
          xs={ 12 }
          sm={ 7 }
        >
          <CartList editable />
        </Grid>
        <Grid
          item
          xs={ 12 }
          sm={ 5 }
        >
          <Card className='sumary-card'>
            <CardContent>
              <Typography variant='h2'>Orden</Typography>
              <Divider sx={{ my: 1 }} />

              <CartOrderSumary />
              { /* OrdenSumary */ }

              <Box
                sx={{ mt: 3 }}
              >
                <Button
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                  href='/checkout/address'
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export default CartPage;
