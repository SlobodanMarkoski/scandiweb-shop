import { Component } from "react";
import { client } from "../../apollo/client";

import { getProductsByCategory } from "../../apollo/queries";
import Spinner from "../spinner/spinner";
import ProductCard from "./product-card/product-cart";

import "./styles.scss";

class ProductListing extends Component {
  state = {
    products: [],
    loading: true,
  };

  updateProducts = async (input) => {
    try {
      const { data, loading } = await client.query({
        query: getProductsByCategory,
        variables: { input },
      });

      this.setState({
        products: data.category.products,
        loading,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  componentDidMount() {
    this.updateProducts(this.props.category);
  }

  componentDidUpdate(prevProps) {
    if (this.props.category.title !== prevProps.category.title)
      this.updateProducts(this.props.category);
  }

  render() {
    const { products, loading } = this.state;

    if (loading) return <Spinner />;

    return (
      <div className="products-container">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default ProductListing;
