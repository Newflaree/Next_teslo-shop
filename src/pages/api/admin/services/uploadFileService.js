import formidable from 'formidable';
import fs from 'fs';
// Database
import { db } from '@/database';
// Models



/**
 * Service Desciption
 *
 * @param {Object} req - Express request object containing query parameters
 * @returns {Object} - An object containing the total count of products and an array of products
 */
const uploadFileService = async ( req ) => {
  await parseFiles( req );

  try {
    return {
      message: 'uploadFileService'
    }
  } catch ( error ) {
    await db.disconnect();
    console.log( `${ '[SERVICE.UPLOAD-FILE]'.bgRed }: ${ error }` );
  }
}

export const config = {
  api: {
    bodyParser: false,
  }
}

const saveFile = ( file ) => {
  const data = fs.readFileSync( file.filepath );
  fs.writeFileSync( `public/${ file.originalFilename }`, data );
  fs.unlinkSync( file.filepath );
  return;
}

const parseFiles = async ( req ) => {
  console.log( 'START'.blue );
  const form = formidable({});
  console.log( 'END'.blue );

  try {
    form.parse( req, ( err, fields, files ) => {
      console.log( 'START'.green );
      console.log({ err, fields, files });
      
      if ( err ) {
        return false;
      }

      saveFile( files.file );
      return true;
    })
  
  } catch ( error ) {
    console.log( error );
  }
}

export default uploadFileService;
