// Material UI
import { Grid } from '@mui/material';
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
          title={ 1 }
          subTitle='Ordenes totales'
          icon={ <CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ 2 }
          subTitle='Ordenes Pagadas'
          icon={ <AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ 3 }
          subTitle='Ordenes Pendientes'
          icon={ <CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ 4 }
          subTitle='Clientes'
          icon={ <GroupOutlined color='primary' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ 5 }
          subTitle='Productos'
          icon={ <CategoryOutlined color='warning' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ 6 }
          subTitle='Sin existencias'
          icon={ <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ 7 }
          subTitle='Bajo inventario'
          icon={ <ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} /> }
        />

        <SummaryTail 
          title={ 8 }
          subTitle='Actualización'
          icon={ <AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} /> }
        />
      </Grid>
    </AdminLayout>
  );
}

export default DashboardPage;
