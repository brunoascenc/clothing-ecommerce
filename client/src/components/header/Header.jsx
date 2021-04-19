import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/CartIcon";
import Cart from "../cart/Cart";
import { selectCartHidden } from "../../redux/cart/cart-selectors";
import { selectCurrentUser } from "../../redux/user/user-selector";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./HeaderStyles";
import { signOutStart } from "../../redux/user/user-actions";

function Header({ currentUser, hidden, signOutStart }) {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/shop">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
          // <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <Cart />}
    </HeaderContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDipatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDipatchToProps)(Header);
