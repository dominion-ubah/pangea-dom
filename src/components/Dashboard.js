import React, { Component } from "react";
// import { addTodoQuery } from '../queries/Queries';
import Navbar from "./Navbar";
import Products from "./Products";
import SideBar from "./Sidebar";
import "../App.css";
import { Query } from "react-apollo";
import { fetchProductsQuery } from "../queries/Queries";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "EUR",
      selectedElem: {},
      drawerTog: false,
    };
  }

  currencySetValue = (e) => {
    this.setState({ currency: e });
  };

  drawerToggle = (e) => {
    this.setState({ drawerTog: e });
  };
  getElemData = (e) => {
    console.log("dssd", e);
    this.setState({ selectedElem: e });
  };

  render() {
    let { currency, drawerTog, selectedElem } = this.state;
    return (
      <div>
        <Navbar />
        <SideBar
          drawer={drawerTog}
          setDrawerToggle={this.drawerToggle}
          addToCart={selectedElem}
          currency={this.currencySetValue}
        />
        <div className="container">
          <div className="row">
            <Query query={fetchProductsQuery} variables={{ currency }}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <option>loading ...</option>;
                }
                if (error) {
                  return <p>error</p>;
                }
                return data.products.map((elem) => (
                  <div className="col-md-4 col-sm-6 col-xs-6 py-5">
                    <Products
                      setDrawerToggle={this.drawerToggle}
                      setElemData={this.getElemData}
                      elem={elem}
                      currency={currency}
                    />
                  </div>
                ));
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
