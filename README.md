# Pangea By DOminion - basic

## Getting Started

### Installing

You need to first install all the npm packages that are used in this app

```
$ npm install
```

Once all the dependencies are installed, you're ready to go!

```
$ npm start
```
This starts the development server at port 3000 (localhost).


### What does this app contain ?

TProduct Page Reqiurements
Should query from
https://pangaea-interviews.now.sh/api/graphql, retrieve the products and display them in a grid. Feel free to use graphql client libraries such as Apollo Client
Each item should display the image, title, price and a "Add to Cart" button.
For screens wider than 768px, it should show grid of 3 items, for less than 768px wide it should show a grid of two wide.
There is no need to implement the page navbar, or filter dropdown as shown in the screenshot .

Cart Reqiurements
When a user clicks "Add to Cart" on an item it should open the cart sidebar and add the item in.
If the item already exists it should increment the quantity.
Clicking the + or - buttons will increase or descrease the quantity, if the quantity is 1 and the "-" button is pressed it should remove the item.
In the top left there is a currency select, doing so should requery the GraphQL api with a new currency and update the prices.
It should sum the items in the cart and display them in the correct selected currency.
Ignore anything related to subscriptions

#### Schema :

```
Currency
Currency String


Products
id Int!
title String!
image_url String!
price ( currency Currency ) Float!
product_options [ProductOption!]!
```

######  __( all queries present in `/src/Queries/queries.js` )__
---
#### Query :

###### 1. `fetchCurrencyQuery` :
This query just fetches the available currencies.
#
```

export const fetchCurrencyQuery = gql`
query fetchCurrencyQuery{
        currency 
}
`;
 

```
###### 2. `fetchProductsQuery` :
This query takes in a variable `currency` and returns data from the the `products` table with updated currency on prices

#
```
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
`
```



### Deployment

I created a file `constants.js` in my `/src` folder, this file will contain my environment variables needed for the app to work.

```
export const vars = {
  "GRAPHQL_ENDPOINT": "https://",
}
```
The App can be deployed immidiately on `heroku` with no further setup or configurations required.
