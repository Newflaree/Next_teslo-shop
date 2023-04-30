export default function handler( req, res ) {
  return res.status( 400 ).json({
    ok: false,
    message: 'Debe de especificar el query de búsqueda'
  });
}
