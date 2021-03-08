import React from "react";
import { Query } from "react-apollo";
import { fetchCurrencyQuery, fetchProductsQuery } from "../queries/Queries";
// import Drawer from "rc-drawer";
// import Todo from './Todo';
import "../App.css";
import { Drawer } from "antd";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "EUR",
      sbo: false,
      cart: [],
      cde: {},
      total: 0,
    };
  }

  handleChange = (e) => {
    let { value } = e.target;
    this.setState({ currency: value }, () => {
      this.props.currency(this.state.currency);
    });
  };

  onSetSidebarClose = () => {
    this.setState({ sbo: false }, () => {
      this.props.setDrawerToggle(false);
    });
  };

  componentDidUpdate(prevProps, prevState) {
    let { addToCart, drawer } = this.props;

    if (drawer !== prevProps.drawer) {
      if (drawer) {
        this.setState({ sbo: drawer });
        if (addToCart.id && !prevState.cart.length) {
          let productArr = [
            ...prevState.cart,
            { elemId: addToCart.id, elem: addToCart, count: 1 },
          ];
          console.log("wewe", productArr);
          this.setState({ cart: productArr });
        } else if (addToCart.id && prevState.cart.length) {
          let findProductInCart = prevState.cart.filter(
            (elem) => elem.elemId === addToCart.id
          );
          if (findProductInCart.length) {
            let productArr = prevState.cart; //[], [{}]
            productArr.forEach((elem) => {
              if (elem.elemId === findProductInCart[0].elemId) {
                // findProductInCart = [];
                return elem.count++;
              }
            });
            console.log("wewea", productArr);
            this.setState({ cart: productArr }, () => {
              console.log("eererer", this.state.cart);
            });
          } else {
            let productArr = [
              ...prevState.cart,
              { elemId: addToCart.id, elem: addToCart, count: 1 },
            ];
            console.log("wewe", productArr);
            this.setState({ cart: productArr });
          }
        }
      }
    }
    if (this.props !== prevProps) {
      console.log("pwpwe", this.props, prevProps);
    }
  }

  increment = (value) => {
    let { cart } = this.state,
      newA = cart;
    newA = this.incFunc(newA, value, "count");
    this.setState({ cart: newA });
  };

  decrement = (value) => {
    let { cart } = this.state,
      newA = cart;
    newA = this.decFunc(newA, value, "count");
    this.setState({ cart: newA });
  };

  incFunc = (array, match, key) => {
    array.forEach((elem) => {
      if (elem.elemId === match) {
        return elem[key]++;
      }
    });
    return array;
  };
  totalPrice = (query, cart) => {
    console.log("4232-----3", cart);
    console.log("4232-----3", cart);

    let acc = 0,
      arr = [],
      val = 0;
    for (let i = 0; i < cart.length; i++) {
      val = this.getNewPrices(query, cart[i].elemId, cart[i].count);
      console.log("4======3", acc + val);
      arr.push(val);
    }
    console.log("4======113", arr);
    return arr.length ? arr.reduce((a, b) => a + b) : 0;
  };
  decFunc = (array, match, key) => {
    array.forEach((elem) => {
      if (elem.elemId === match) {
        elem[key]--;
        if (elem[key] === 0) {
          array.splice(0, elem.elemId);
        }
      }
    });
    return array;
  };
  getNewPrices = (array, id, count) => {
    //  let {total} = this.state,
    //  totalTemp = total ;
    let price = parseFloat(array.filter((e) => e.id === id)[0].price) * count;
    //  totalTemp = totalTemp+price;
    //  this.setState({total: totalTemp});
    return price;
  };

  render() {
    let { currency } = this.state;
    return (
      <>
        <Drawer
          title="Your Cart"
          placement="right"
          closable={false}
          onClose={this.onSetSidebarClose}
          visible={this.state.sbo}
        >
          <select defaultValue="EUR" onChange={(e) => this.handleChange(e)}>
            <Query query={fetchCurrencyQuery}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <option>loading ...</option>;
                }
                if (error) {
                  return <p>error</p>;
                }
                return data.currency.map((elem, i) => (
                  <option key={i} value={elem}>
                    {elem}
                  </option>
                ));
              }}
            </Query>
          </select>
          <ion-icon
            size="large"
            style={{ cursor: "pointer" }}
            onClick={() => this.onSetSidebarClose()}
            name="chevron-forward-circle"
          ></ion-icon>
          <Query query={fetchProductsQuery} variables={{ currency }}>
            {({ loading, error, data }) => {
              if (loading) {
                return <option>loading ...</option>;
              }
              if (error) {
                return <p>error</p>;
              }
              return (
                <div>
                  {this.state.cart.map((el) => (
                    <div>
                      <div className="bg_white_card">
                        <div>
                          <div>{el.elem.title}</div>
                          <div></div>
                        </div>
                        <div>
                          <div className="">
                            <span onClick={() => this.decrement(el.elemId)}>
                              -
                            </span>{" "}
                            {el.count}{" "}
                            <span onClick={() => this.increment(el.elemId)}>
                              +
                            </span>
                          </div>
                          <div className="">
                            {currency +
                              " " +
                              this.getNewPrices(
                                data.products,
                                el.elemId,
                                el.count
                              )}
                            {/* {el.elem.price} */}
                          </div>
                          <div className="">
                            <img
                              width="60"
                              src={el.elem.image_url}
                              alt={el.elem.title}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div>
                    <b>
                      Sum Total:{" "}
                      {this.state.currency+" "}{this.totalPrice(data.products, this.state.cart)}
                    </b>
                  </div>
                </div>
              );
            }}
          </Query>
          {/* {data.products.map(e=>(
                      <>
                        {e.price}
                      </>
                    ))} */}
        </Drawer>
      </>
    );
  }
}

export default SideBar;
