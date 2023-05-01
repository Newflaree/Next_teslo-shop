// Material UI
import { Box, Typography } from '@mui/material';
// Components
import {
  FullScreenLoading,
  ProductGrid
} from '@/components';
// Database
import { dbProducts } from '@/database';
// Hooks
import { useProducts } from '@/hooks';
// Layouts
import { ShopLayout } from '@/components/layouts';


const SearchPage = ({ products, productsExists, query }) => {
  //const { products, isLoading } = useProducts( '/search/cybertruck' );

  return (
    <ShopLayout
      title={ 'TesloShop - Busqueda' }
      pageDescription={ 'Encuentra los mejores productos de Teslo aquí' }
    >
      <Typography
        variant='h1'
        component='h1'
      >
        Buscar Producto
      </Typography>

      {
        productsExists
          ? (
            <Typography
              variant='h2'
              sx={{
                mb: 1
              }}
            >
              Término: { query }
            </Typography>
          )
          : (
            <Box
              display='flex'
            >
              <Typography
                variant='h2'
                sx={{
                  mb: 1
                }}
              >
                No encontramos ningún producto
              </Typography>

              <Typography
                variant='h2'
                color='secondary'
                sx={{
                  ml: 1
                }}
              >
                { query }
              </Typography>
            </Box>
          )
      }

      <ProductGrid products={ products } />
    </ShopLayout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { query = '' } = params;

  if ( query.length === 0 ) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductsBySearchTerm( query );
  const productsExists = products.length > 0;

  // TODO: Retornar otros productos
  if ( !productsExists ) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      productsExists,
      query
    },
  }
}


export default SearchPage;
