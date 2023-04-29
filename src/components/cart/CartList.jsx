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
// Test Data
import { initialData } from '@/database/products';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export const CartList = ({ editable = false }) => {


  return (
    <>
      {
        productsInCart.map( product => (
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
                      image={ `/products/${ product.images[0] }` }
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
                    ? <ItemCounter />
                    : <Typography variant='h5'>3 items</Typography>

                  
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
