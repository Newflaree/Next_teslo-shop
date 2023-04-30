// Material
import { Typography } from '@mui/material';
// Components
import { ProductGrid } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
// Hooks
import { useProducts } from '@/hooks';
// Layouts
import { ShopLayout } from '@/components/layouts';


const WomenPage = () => {
  const { products, isLoading } = useProducts( '/products?gender=women' );

  return (
    <ShopLayout
      title={ 'TesloShop - Mujeres' }
      pageDescription={ 'Encuentra los mejores productos de Teslo para mujeres' }
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
        Productos para mujeres
      </Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductGrid products={ products } />
      }
    </ShopLayout>
  );
}

export default WomenPage;
