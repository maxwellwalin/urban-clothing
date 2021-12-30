import gql from 'graphql-tag'

export const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION($id: ID!, $name: String, $description: String, $status: String, $price: Int) {
        updateProduct(
            id: $id, 
            data: { name: $name, description: $description, status: $status, price: $price }
        ) {
            id
            name
            description
            status
            price
        }
    }
`

export const SINGLE_PRODUCT_QUERY = gql`
query SINGLE_PRODUCT_QUERY($id: ID!){
  Product(where: { id: $id }) {
    id
    name
    price
    description
    photo {
        altText
        image {
            publicUrlTransformed
        }
    }
  }
}`

export const ALL_PRODUCTS_QUERY = gql`
query ALL_PRODUCTS_QUERY {
  allProducts {
    id
    name
    price
    description
    status
    photo {
      image {
        id
        publicUrlTransformed
      }
    }
  }
}`

export const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!) {
        deleteProduct(id: $id) {
            id
            name
        }
    }
`

export const CREATE_PRODUCT_MUTATION = gql`
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