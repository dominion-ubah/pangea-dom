import gql from "graphql-tag";

//query

export const fetchCurrencyQuery = gql`
  query fetchCurrencyQuery {
    currency
  }
`;

export const fetchProductsQuery = gql`
  query fetchProductsQuery($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
      product_options {
        title
      }
    }
  }
`;
