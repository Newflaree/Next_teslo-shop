// Next.js
import { useRouter } from 'next/router';
// Material UI
import {
  Box,
  Button,
  Grid,
  Typography
} from '@mui/material';
// Layouts
import { ShopLayout } from '@/components/layouts';
// Components
import {
  ItemCounter,
  ProductSizeSelector,
  ProductSlideshow
} from '@/components';
// Hooks
import { useProducts } from '@/hooks';


const ProductPage = () => {
  /*
  const { query } = useRouter();
  const { products: product, isLoading } = useProducts( `/products/${ query.slug }` );

  if ( isLoading ) return <h1>Cargando</h1>
  if ( !product ) return <h1>No existe</h1>
  */

  return (
    <ShopLayout
      title={ product.title }
      pageDescription={ product.description }
    >
      <Grid
        container
        spacing={ 3 }
      >
        <Grid
          item
          xs={ 12 }
          sm={ 7 }
        >
          <ProductSlideshow images={ product.images } />
        </Grid>

        <Grid
          item
          xs={ 12 }
          sm={ 5 }
        >
          <Box
            display='flex'
            flexDirection='column'
          >
            { /* Titulos */ }
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${ product.price }` }</Typography>
            { /* Cantidad */ }
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              { /* TODO: Item Counter */ }
              <ItemCounter />
              <ProductSizeSelector
                sizes={ product.sizes }
              />
            </Box>
            { /* Agregar al carrito */ }
            <Button
              color='secondary'
              className='circular-btn'
            >
              Agregar al carrito
            </Button>

            {
              /*
            <Chip 
              label='No hay disponibles'
              color='error'
              variant='outlined'
            />
                * */
            }

            { /* Descripción */ }
            <Box
              sx={{
                mt: 3
              }}
            >
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{ product.description }</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export default ProductPage;
