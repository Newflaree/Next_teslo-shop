// React
import { useContext, useState } from 'react';
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
// Components
import {
  ItemCounter,
  ProductSizeSelector,
  ProductSlideshow
} from '@/components';
// Context
import {CartContext} from '@/context';
// Database
import { dbProducts } from '@/database';
// Layouts
import { ShopLayout } from '@/components/layouts';


const ProductPage = ({ product }) => {
  const { push } = useRouter();
  const { addProductToCart } = useContext( CartContext );
  const [ tempCartProduct, setTempCartProduct ] = useState({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  });

  const selectedSize = ( size ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }));
  }

  const onUpdateQuantity = ( quantity ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }

  const onAddProduct = () => {
    if ( !tempCartProduct.size ) return;

    addProductToCart( tempCartProduct );
    push( '/cart' )
  }

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

              <ItemCounter
                currentValue={ tempCartProduct.quantity }
                updatedQuantity={ onUpdateQuantity }
                maxValue={ product.inStock > 10 ? 10 : product.inStock }
              />
              
              <ProductSizeSelector
                sizes={ product.sizes }
                selectedSizes={ tempCartProduct.size }
                onSelectedSize={ selectedSize }
              />
            </Box>
            { /* Agregar al carrito */ }
            {
              ( product.inStock > 0 ) 
                ? (
                  <Button
                    onClick={ onAddProduct }
                    color='secondary'
                    className='circular-btn'
                  >
                    {
                      tempCartProduct.size
                        ? 'Agregar al carrito'
                        : 'Seleccione una talla'
                    }
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
