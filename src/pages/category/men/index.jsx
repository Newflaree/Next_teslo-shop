// Material
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


const MenPage = () => {
  const { products, isLoading } = useProducts( '/products?gender=men' );

  return (
    <ShopLayout
      title={ 'TesloShop - Hombres' }
      pageDescription={ 'Encuentra los mejores productos de Teslo para hombres' }
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
        Productos para hombre
      </Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductGrid products={ products } />
      }
    </ShopLayout>
  );
}

export default MenPage;
