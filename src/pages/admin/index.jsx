// Material Icons
import { DashboardOutlined } from '@mui/icons-material';
// Layouts
import { AdminLayout } from '@/components/layouts';


const DashboardPage = () => {
  return (
    <AdminLayout
      title='Dashoboard'
      subTitle='Estadísticas generales'
      icon={ <DashboardOutlined /> }
    >
      <h2>Hola Mundo</h2>
    </AdminLayout>
  );
}

export default DashboardPage;
