// Next.js
import { Inter } from 'next/font/google'
// Material UI
import {
  Typography
} from '@mui/material';
// Components
import { ProductGrid } from '@/components/products';
// Layouts
import { ShopLayout } from '@/components/layouts';
// Test Data
import { initialData } from '@/database/products';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { products } = initialData;

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

      <ProductGrid products={ products } />
    </ShopLayout>
  );
}
