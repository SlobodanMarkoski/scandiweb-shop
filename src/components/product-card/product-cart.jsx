import { Component } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { ReactComponent as EmptyCart } from "../../assets/EmptyCart-white.svg";
import CustomButton from "../custom-button/custom-button";

import "./styles.scss";

class ProductCard extends Component {
  static contextType = CartContext;
  render() {
    const { product } = this.props;
    const { id, gallery, name, prices, attributes, inStock } = product;
    const { selectedCurrency } = this.context.state;
    const { addToCart } = this.context;

    const selectedAttributes = (attr) => {
      const obj = {};
      attr.map((attribute) => (obj[attribute.name] = attribute.items[0].value));

      return obj;
    };

    const newId = JSON.stringify(selectedAttributes(attributes));

    return (
      <div className={inStock ? "container" : "container out-of-stock_hover"}>
        <Link to={`product/${id}/`} className="product-cart-container">
          {!inStock && (
            <div className="out-of-stock">
              <h3>OUT OF STOCK</h3>
            </div>
          )}
          <img src={gallery[0]} alt={name} />
          <div className="text-container">
            <span className="name">{name}</span>
            {prices.map(
              ({ currency, amount }) =>
                selectedCurrency.label === currency.label && (
                  <span key={amount} className="price">
                    {currency.symbol}
                    {amount}
                  </span>
                )
            )}
          </div>
        </Link>
        <div className="add-to-cart">
          <CustomButton
            onClick={() =>
              addToCart(
                { ...product, id: `${product.id}-${newId}` },
                selectedAttributes(attributes)
              )
            }
          >
            <EmptyCart />
          </CustomButton>
        </div>
      </div>
    );
  }
}

export default ProductCard;
