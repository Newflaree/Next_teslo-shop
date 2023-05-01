// Material UI
import { Typography } from '@mui/material';
// Components
import {
  FullScreenLoading,
  ProductGrid
} from '@/components';
// Hooks
import { useProducts } from '@/hooks';
// Layouts
import { ShopLayout } from '@/components/layouts';


const SearchPage = () => {
  const { products, isLoading } = useProducts( '/search/cybertruck' );

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

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductGrid products={ products } />
      }
    </ShopLayout>
  );
}

export default SearchPage;
