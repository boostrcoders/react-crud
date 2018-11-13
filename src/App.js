import React, { Component } from "react";
import ProductItem from "./components/ProductItem";
import AddProduct from "./components/AddProduct";
import "./App.css";

const products = [
  {
    name: "iPad",
    price: 200
  },
  {
    name: "iPhone",
    price: 650
  }
];

localStorage.setItem("products", JSON.stringify(products));

class App extends Component {
  state = {
    products: JSON.parse(localStorage.getItem("products")),
    isEdit: [false, 0]
  };

  componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
  }

  getProducts() {
    return this.state.products;
  }

  addProduct(name, price) {
    const products = this.getProducts();
    products.push({ name, price });
    this.setState({ products });
  }

  deleteProduct(index) {
    let productsArr = this.getProducts();
    productsArr.splice(index, 1);
    this.setState({ products: productsArr });
    localStorage.setItem("products", JSON.stringify(productsArr));
  }
  editProduct(name) {
    this.setState({ isEdit: [true, name] });
  }
  onEditSubmit(name, price) {
    let products = this.getProducts();

    products = products.map(product => {
      if (product.name === name) {
        product.name = name;
        product.price = price;
      }
      return product;
    });

    this.setState({ products, isEdit: [false, 0] });
    console.log(products);
  }

  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>
        <AddProduct onAdd={this.addProduct.bind(this)} />
        {this.state.products.map((product, key) => {
          return (
            <ProductItem
              isEdit={this.state.isEdit}
              key={key}
              name={product.name}
              price={product.price}
              onEdit={() => this.editProduct(product.name)}
              onDelete={() => this.deleteProduct(key)}
              editSubmit={this.onEditSubmit.bind(this)}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
