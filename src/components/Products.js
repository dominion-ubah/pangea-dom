import React from "react";
import "../App.css";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDrawer: true,
    };
  }

  addToCart = (elem) => {
    let { toggleDrawer } = this.state;
    this.setState({ toggleDrawer: true }, () => {
      this.props.setDrawerToggle(toggleDrawer);
      this.props.setElemData(elem);
    });
  };

  render() {
    const { elem, currency } = this.props;
    return (
      <>
        <div className="product-tile text-center py-4">
          <div className="img">
            <img className="img-fluid" src={elem.image_url} alt={elem.title} />
          </div>
          <div className="mt-4 ">
            <h5>{elem.title}</h5>
          </div>
          <div>
            <h5>{currency + " " + elem.price}</h5>
          </div>
          <div
            className="addToCartBtn px-3 py-2"
            onClick={() => this.addToCart(elem)}
          >
            Add to Cart
          </div>
        </div>
      </>
    );
  }
}

export default Products;
