import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './ErrorMessage'
import FormStyles from './styles/Form'

export const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!) {
        Product(where: { id: $id }) {
            id
            name
            description
            price
        }
    }
`

export const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION($id: ID!, $name: String, $description: String, $price: Int) {
        updateProduct(
            id: $id, 
            data: { name: $name, description: $description, price: $price }
        ) {
            id
            name
            description
            price
        }
    }
`

export default function UpdateProduct({ id }) {
    const { data: queryData, error: queryErr, loading: queryLoad } = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: { id }
    })

    const [updateProduct, { error: updateErr, loading: updateLoad }] = useMutation(UPDATE_PRODUCT_MUTATION)

    if (queryLoad) return <p>Loading...</p>

    const { inputs, handleChange } = useForm(queryData.Product);

    return (
        <FormStyles onSubmit={async (e) => {
            e.preventDefault();
            await updateProduct({
                variables: {
                    id,
                    name: inputs.name,
                    description: inputs.description,
                    price: inputs.price
                }
            });
        }}>
            <DisplayError error={queryErr || updateErr} />
            <fieldset disabled={updateLoad} aria-busy={updateLoad}>
                <label htmlFor='name'>
                    Name
                    <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Name'
                        value={inputs.name}
                        onChange={handleChange} />
                </label>
                <label htmlFor='price'>
                    Price
                    <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='Price'
                        value={inputs.price}
                        onChange={handleChange} />
                </label>
                <label htmlFor='description'>
                    Description
                    <textarea
                        type='text'
                        id='description'
                        name='description'
                        placeholder='Description'
                        value={inputs.description}
                        onChange={handleChange} />
                </label>

                <button type="submit">✏ Update Product</button>
            </fieldset>
        </FormStyles>
    )
}
