// React
import { useEffect, useState } from 'react';
// SWR
import useSWR from 'swr';
// Material UI
import { Grid, Typography } from '@mui/material';
// Material Icons
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined
} from '@mui/icons-material';
// Components
import { SummaryTail } from '@/components/admin';
// Layouts
import { AdminLayout } from '@/components/layouts';


const DashboardPage = () => {
  const { data, error } = useSWR( '/api/admin/dashboard', {
    refreshInterval: 30 * 1000
  });

  const [ refreshIn, setRefreshIn ] = useState( 30 );

  useEffect( () => {
    const interval = setInterval( () => {
      setRefreshIn( refreshIn => refreshIn ? refreshIn -1 : 30 );
    }, 1000 );

    return () => clearInterval( interval )
  }, [] );

  if ( !error && !data ) {
    return <></>
  }

  if ( error ) {
    console.log( error );
    return <Typography>Error al cargar la información</Typography>
  }

  const {
    totalOrders,
    paidOrders,
    notPaidOrders,
    totalClients,
    totalProducts,
    productsWithNoInventary,
    productsWithLowInventary
  } = data;

  return (
    <AdminLayout
      title='Dashoboard'
      subTitle='Estadísticas generales'
      icon={ <DashboardOutlined /> }
    >
      <Grid
        container
        spacing={ 2 }
      >
        <SummaryTail 
          title={ totalOrders }
          subTitle='Ordenes totales'
          icon={ <CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ paidOrders }
          subTitle='Ordenes Pagadas'
          icon={ <AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ notPaidOrders }
          subTitle='Ordenes Pendientes'
          icon={ <CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ totalClients }
          subTitle='Clientes'
          icon={ <GroupOutlined color='primary' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ totalProducts }
          subTitle='Productos'
          icon={ <CategoryOutlined color='warning' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ productsWithNoInventary }
          subTitle='Sin existencias'
          icon={ <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ productsWithLowInventary }
          subTitle='Bajo inventario'
          icon={ <ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ refreshIn }
          subTitle='Actualización'
          icon={ <AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} /> }
        />
      </Grid>
    </AdminLayout>
  );
}



export default DashboardPage;
