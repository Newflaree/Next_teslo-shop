// Next.js
import NextLink from 'next/link';
// Material UI
import {
  Chip,
  Grid,
  Link,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// Layouts
import { ShopLayout } from '@/components/layouts';

const rows = [
  { id: 1, paid: true, fullname: 'Camilo López' },
  { id: 2, paid: false, fullname: 'Test 1' },
  { id: 3, paid: true, fullname: 'Test 2' },
  { id: 4, paid: false, fullname: 'Test 3' },
  { id: 5, paid: false, fullname: 'Test 4' },
  { id: 6, paid: true, fullname: 'Test 5' },
  { id: 7, paid: false, fullname: 'Test 6' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    renderCell: ( params ) => {
      return (
        params.row.paid
          ? <Chip color='success' label='Pagada' variant='outlined' />
          : <Chip color='error' label='Pendiente de pago' variant='outlined' />
      )
    }
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 300,
    sortable: false,
    renderCell: ( params ) => {
      return (
        <NextLink
          href={ `/orders/${ params.row.id }` }
          passHref
          legacyBehavior
        >
          <Link
            underline='always'
            color={ 'rgba(0,0,0)' }
          >
            Ver detalle
          </Link>
        </NextLink>
      )
    }
  }
];

export const HistoryPage = () => {
  return (
    <ShopLayout
      title='Historial de ordenes'
      pageDescription='Historial de ordenes del cliente'
    >
      <Typography
        variant='h1'
        component='h1'
      >
        Historial de ordenes
      </Typography>

      <Grid
        container
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
    </ShopLayout>
  );
}

export default HistoryPage;
