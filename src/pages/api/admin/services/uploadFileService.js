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

const parseFiles = async ( req ) => {

}

export default uploadFileService;
