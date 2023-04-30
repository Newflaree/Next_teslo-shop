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


export default function HomePage() {
  const { products, isLoading, isError } = useProducts( '/products' );

  return (
    <ShopLayout
      title={ 'TesloShop - Home' }
      pageDescription={ 'Encuentra los mejores productos de Teslo aquí' }
    >
      <Typography
        variant='h1'
        component='h1'
      >
        Tienda
      </Typography>

      <Typography
        variant='h2'
        sx={{
          mb: 1
        }}
      >
        Todos los productos
      </Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductGrid products={ products } />
      }
    </ShopLayout>
  );
}
