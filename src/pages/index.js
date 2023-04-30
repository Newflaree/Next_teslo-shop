// Next.js
import { Inter } from 'next/font/google'
// Material UI
import {
  Typography
} from '@mui/material';
// Components
import { ProductGrid } from '@/components/products';
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
          ? <h1>Cargando...</h1>
          : <ProductGrid products={ products } />
      }
    </ShopLayout>
  );
}
