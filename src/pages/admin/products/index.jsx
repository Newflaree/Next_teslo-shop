// Next.js
import NextLink from 'next/link';
// SWR
import useSWR from 'swr';
// Material UI
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Link
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// Material Icons
import {
  AddOutlined,
  CategoryOutlined
} from '@mui/icons-material';
// Layouts
import { AdminLayout } from '@/components/layouts';


const columns = [
  {
    field: 'img',
    headerName: 'Foto',
    renderCell: ({ row }) => {
      return (
        <a
          href={ `/products/${ row.slug }` }
          target='_blank' 
        >
          <CardMedia
            component='img'
            className='fadeIn'
            alt={ row.title }
            image={ `/products/${ row.img }` }
          />
        </a>
      )
    }
  },
  {
    field: 'title',
    headerName: 'Titulo',
    width: 250,
    renderCell: ({ row }) => {
      return (
        <NextLink
          href={ `/admin/products/${ row.slug }` }
          passHref
          legacyBehavior
        >
          <Link underline='always'>
            { row.title }
          </Link>
        </NextLink>
      )
    }
  },
  {
    field: 'gender',
    headerName: 'Genero',
  },
  {
    field: 'type',
    headerName: 'Tipo',
  },
  {
    field: 'inStock',
    headerName: 'Inventario',
  },
  {
    field: 'price',
    headerName: 'Precio',
  },
  {
    field: 'sizes',
    headerName: 'Tallas',
    width: 250
  },
];

const ProductsPage = () => {
  const { data, error } = useSWR( '/api/admin/products' );

  if ( !data && !error ) return <></>

  const { products } = data;

  const rows= products.map( product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug
  }));

  return (
    <AdminLayout
      title={ `Productos (${ products?.length })` }
      subTitle='Mantenimiento de productos'
      icon={ <CategoryOutlined /> }
    >
      <Box
        display='flex'
        justifyContent='end'
        sx={{
          mb: 2
        }}
      >
        <Button
          startIcon={ <AddOutlined /> }
          color='secondary'
          href='/admin/products/new'
        >
          Crear producto
        </Button>
      </Box>

      <Grid
        container
        className='fadeIn'
      >
        <Grid
          item
          xs={ 12 }
          sx={{
            height: 650,
            width: '100%'
          }}
        >
          <DataGrid
            rows={ rows }
            columns={ columns }
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}

export default ProductsPage;
