import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button/custom-button";

import CartDropdownItem from "./cart-dropdown-item/cart-dropdown-item";

import "./styles.scss";

export default class CartDropdown extends Component {
  render() {
    const {
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      selectedCurrency,
      totalPrice,
      handleDropdownCart,
    } = this.props;

    return (
      <div className="cart-dropdown-container">
        <h4 className="bag">
          <span>My Bag, </span>
          <span>{cartCount} items</span>
          {!cartItems.length && (
            <p className="empty-cart">
              You card ise empty! Start shopping now!
            </p>
          )}
        </h4>
        {cartItems?.map((cartItem) => (
          <CartDropdownItem
            key={cartItem.id}
            cartItem={cartItem}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            selectedCurrency={selectedCurrency}
          />
        ))}
        <div className="total">
          <span>Total</span>
          <span>
            {selectedCurrency.symbol}
            {totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="dropdown-buttons">
          <Link to="cart" onClick={handleDropdownCart}>
            <CustomButton inverted="true" disabled={!cartItems.length}>
              VIEW BAG
            </CustomButton>
          </Link>
          <CustomButton disabled={!cartItems.length}>CHECKOUT</CustomButton>
        </div>
      </div>
    );
  }
}