// Bcrypt
import bcrypt from 'bcryptjs';
// Models
import { User } from '@/models';
import { db } from './';

export const checkUserEmailPassword = async ( email = '', password = '' ) => {
  try {
    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if ( !user ) return null;

    if ( !bcrypt.compareSync( password, user.password ) ) return null;

    const { role, name, _id } = user;

    return {
      _id,
      email: email.toLocaleLowerCase(),
      role,
      name
    }

  } catch ( error ) {
    console.log( `${ '[DATABASE.CHECK-USER-EMAIL-PASSWORD]'.bgRed }: ${ error }` );
  }
}
