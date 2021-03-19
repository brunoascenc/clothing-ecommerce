import React from "react";
import "./Cart.scss";
import CustomButton from "../custom-button/CustomButton";

function Cart() {
  return (
    <div className="cart-dropdown">
      <div className="cart-items"></div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
}

export default Cart;
