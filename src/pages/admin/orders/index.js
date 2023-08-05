// Material Icons
import { ConfirmationNumberOutlined } from '@mui/icons-material';
// Layouts
import { AdminLayout } from '@/components/layouts';


const OrdersPage = () => {
  return (
    <AdminLayout
      title='Ordenes'
      subTitle='Mantenimiento de Ordenes'
      icon={ <ConfirmationNumberOutlined /> }
    >

    </AdminLayout>
  );
}

export default OrdersPage;
