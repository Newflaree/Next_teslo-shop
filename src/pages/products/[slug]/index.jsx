// Next.js
import { useRouter } from 'next/router';
// Material UI
import {
  Box,
  Button,
  Chip,
  Grid,
  Typography
} from '@mui/material';
// Layouts
import { ShopLayout } from '@/components/layouts';
// Database
import { dbProducts } from '@/database';
// Components
import {
  ItemCounter,
  ProductSizeSelector,
  ProductSlideshow
} from '@/components';


const ProductPage = ({ product }) => {
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
            <Typography variant='h1' component='h1'>
              { product.title }
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              { `$${ product.price }` }
            </Typography>
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
            {
              ( product.inStock > 0 ) 
                ? (
                  <Button
                    color='secondary'
                    className='circular-btn'
                  >
                    Agregar al carrito
                  </Button>
                )
                : (
                  <Chip
                    label='No hay disponibles'
                    color='error'
                    variant='outlined'
                  />
                )
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

/*
 * No Usar Esto
export const getServerSideProps = async ({ params }) => {
  const product = await dbProducts.getProductBySlug( params.slug ) || {};

  if ( !product ) {
    return {
      redirect: {
        description: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
  }
}
*/
export const getStaticPaths = async ( ctx ) => {
  const productSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }) => {
  const { slug = '' } = params;
  const product = await dbProducts.getProductBySlug( slug );

  if ( !product ) {
    return {
      redirect: {
        description: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}


export default ProductPage;
