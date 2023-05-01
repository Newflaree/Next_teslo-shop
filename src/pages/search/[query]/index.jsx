// Material UI
import { Typography } from '@mui/material';
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


const SearchPage = ({ products }) => {
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

      <Typography
        variant='h2'
        sx={{
          mb: 1
        }}
      >
        ABC --- 123
      </Typography>

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
  // TODO: Retornar otros productos

  return {
    props: {
      products
    },
  }
}


export default SearchPage;
