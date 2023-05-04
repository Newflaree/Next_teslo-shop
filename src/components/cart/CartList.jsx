// React
import { useContext } from 'react';
// Next.js
import NextLink from 'next/link';
// Material UI
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography
} from '@mui/material';
// Components
import { ItemCounter } from '../ui';
// Context
import { CartContext } from '@/context';


export const CartList = ({ editable = false }) => {
  const { cart } = useContext( CartContext )

  return (
    <>
      {
        cart.map( product => (
          <Grid
            key={ product.slug }
            container
            spacing={ 2 }
            sx={{
              mb: 1
            }}
          >
            <Grid
              item
              xs={ 3 }
            >
              <NextLink
                href='/products/slug'
                passHref
                legacyBehavior
              >
                <Link>
                  <CardActionArea>
                    <CardMedia 
                      image={ `/products/${ product.image }` }
                      component='img'
                      sx={{
                        borderRadius: '5px'
                      }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>

            <Grid
              item
              xs={ 7 }
            >
              <Box
                display='flex'
                flexDirection='column'
              >
                <Typography variant='body1'>{ product.title }</Typography>
                <Typography variant='body1'>
                  Talla: <strong>M</strong>
                </Typography>

                {
                  editable
                    ? (
                      <ItemCounter 
                        currentValue={ product.quantity }
                        maxValue={ 10 }
                        updatedQuantity={ () => {} }
                      />
                    )
                    : (
                      <Typography variant='h5'>
                        { product.quantity } { product.quantity > 1 ? 'productos' : 'producto' }
                      </Typography>
                    )

                  
                }
              </Box>
            </Grid>

            <Grid
              item
              xs={ 2 }
              display='flex'
              alignItems='center'
              flexDirection='column'
            >
              <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>

              {
                editable && (
                  <Button
                    variant='text'
                    color='secondary'
                  >
                    Remover
                  </Button>
                )
              }
            </Grid>
          </Grid>
        ))
      }
    </>
  );
}
