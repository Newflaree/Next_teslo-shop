import { db, seedDatabase } from '@/database';
import { Product, User } from '@/models';

export default async function handler( req, res ) {
  if ( process.env.NODE_ENV === 'production' ) {
    return res.status( 401 ).json({
      message: 'No tiene acceso a este servicio'
    });
  };

  await db.connect();

  // Seed Users
  await User.deleteMany();
  await User.insertMany( seedDatabase.initialData.users );

  // Seed Products
  await Product.deleteMany();
  await Product.insertMany( seedDatabase.initialData.products );

  await db.disconnect();

  res.status( 200 ).json({
    message: 'Proceso realizado correctamente'
  });
}
