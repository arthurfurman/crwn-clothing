import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCart } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCart, totalItemCount }) => (
  <div className="cart-icon" onClick={toggleCart}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{totalItemCount}</span>
  </div>
);

const mapStatetoProps = createStructuredSelector({
  totalItemCount: selectCartItemsCount
})

const mapDispatchToProps = dispatch => ({
  toggleCart: () => dispatch(toggleCart()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(CartIcon);
