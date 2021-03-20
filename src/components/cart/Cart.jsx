import React from "react";
import { connect } from "react-redux";
import {createStructuredSelector} from 'reselect'
import "./Cart.scss";
import CustomButton from "../custom-button/CustomButton";
import CartItem from "../cart-item/CartItem";
import {Link} from 'react-router-dom'

import { selectCartItems } from "../../redux/cart/cart-selectors";
import { toggleCartHidden } from "../../redux/cart/cart-actions";

function Cart({ cartItems, dispatch }) {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ?
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        )) :
        <span className='empty-message'>Your cart is empty</span>
        }
      </div>
      <Link to='/checkout'>
      <CustomButton onClick={() => dispatch(toggleCartHidden())}>GO TO CHECKOUT</CustomButton>
      </Link>
    </div>
  );
}

const mapStateToProps = createStructuredSelector ({
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(Cart);
