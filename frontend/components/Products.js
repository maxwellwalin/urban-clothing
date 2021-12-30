import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { ALL_PRODUCTS_QUERY } from '../lib/gql';
import Product from './Product';

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <ProductsListStyles> 
        {data.allProducts.filter((product) => product.status != "Unavailable").map(product => <Product key={product.id} product={product} />)}
      </ProductsListStyles>
    </div>
  );
}
