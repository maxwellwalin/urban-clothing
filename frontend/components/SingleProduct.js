import { useQuery } from "@apollo/client"
import Head from "next/head";
import styled from "styled-components";
import { SINGLE_PRODUCT_QUERY } from "../lib/gql";
import DisplayError from "./ErrorMessage";

export default function SingleProduct({ id }) {

    const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: {
            id,
        }
    });

    if (loading) return <p>Loading...</p>
    if (error) return <DisplayError error={error} />

    return (
        <ProductStyles>
            <Head>
                <title>Sick Fits | {data.Product.name}</title>
            </Head>
            <img
                src={data.Product.photo.image.publicUrlTransformed}
                alt={data.Product.photo.altText}
            />
            <div className="details">
                <h2>{data.Product.name}</h2>
                <p>{data.Product.description}</p>
            </div>
        </ProductStyles>
    )
}

const ProductStyles = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    justify-content: center;
    align-items: top;
    gap: 2rem;
    
    img {
        width: 100%;
        object-fit: contain;
    }
`