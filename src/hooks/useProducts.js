import useSWR from 'swr';


export const useProducts = ( url, config = {} ) => {
  const { data, error } = useSWR( `/api${ url }`, config );
  const products = data?.totalResponseProducts || data?.productBySlug || [];

  return {
    products,
    isLoading: !error && !data,
    isError: error
  }
}
