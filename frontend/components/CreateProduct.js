import useForm from "../lib/useForm";
import FormStyles from "../components/styles/Form";
import { useMutation } from '@apollo/client';
import DisplayError from '../components/ErrorMessage';
import { ALL_PRODUCTS_QUERY } from "./Products";
import Router from 'next/router';
import { CREATE_PRODUCT_MUTATION } from "../lib/gql";

export default function CreateProduct() {
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        image: '',
        name: '',
        price: '',
        description: ''
    });

    const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    });

    return (
        <FormStyles onSubmit={async (e) => {
            e.preventDefault();
            const res = await createProduct();
            clearForm();
            Router.push({
                pathname: `/product/${res.data.createProduct.id}`
            });
        }}>
            <DisplayError error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor='image'>
                    Image
                    <input
                        required
                        type='file'
                        id='image'
                        name='image'
                        onChange={handleChange} />
                </label>
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

                <button type="submit">+ Add Product</button>
            </fieldset>
        </FormStyles>
    )
}
