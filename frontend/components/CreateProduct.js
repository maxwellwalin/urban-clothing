import useForm from "../lib/useForm";
import styled, { keyframes } from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import DisplayError from '../components/ErrorMessage';
import { ALL_PRODUCTS_QUERY } from "./Products";
import Router from 'next/router';

const CREATE_PRODUCT_MUTATION = gql`
mutation CREATE_PRODUCT_MUTATION($name: String!, $description: String!, $price: Int!, $image: Upload) {
  createProduct(
      data: {
        name: $name,
        description: $description,
        price: $price,
        status: "AVAILABLE",
        photo: {
            create: {
                image: $image,
                altText: $name
            }
        }
  }
  ) {
        id
        name
        price
        description
    }
}`

export default function CreateProduct() {
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        image: '',
        name: '',
        price: '',
        description: ''
    });

    const [createProduct, { loading, data, error }] = useMutation(CREATE_PRODUCT_MUTATION, {
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

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const FormStyles = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--red);
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        #ff3019 0%,
        #e2b04a 50%,
        #ff3019 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;