export const format = ( value = 0 ) => {
  const formatter = new Intl.NumberFormat( 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return formatter.format( value );
}
