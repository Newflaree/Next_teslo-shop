import jwt from 'jsonwebtoken';


export const signToken = ( _id = '', email = '' ) => {
  if ( !process.env.JWT_SECRET_SEED ) {
    return new Error( 'No hay semilla de JWT - Revisar variables de entorno' );
  }

  return jwt.sign(
    // Payload
    { _id, email },
    // Seed
    process.env.JWT_SECRET_SEED || '',
    // Options
    { expiresIn: '15d' }
  )
}

export const isValidToken = ( token = '' ) => {
  if ( !process.env.JWT_SECRET_SEED ) {
    return new Error( 'No hay semilla de JWT - Revisar variables de entorno' );
  }

  return new Promise( ( resolve, reject ) => {
    try {
      jwt.verify( token, process.env.JWT_SECRET_SEED || '', ( error, payload ) => {
        if ( error ) return reject( 'JWT no válido' );

        const { _id } = payload;

        resolve( _id );
      });
    } catch ( error ) {
      return reject( 'JWT no válido' );
    }
  });
}
