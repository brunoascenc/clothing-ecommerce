import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import SignInAndSignUp from "./pages/signIn-signUp/signIn-signUp";
import { selectCurrentUser } from "./redux/user/user-selector";
import Checkout from "./pages/checkout/Checkout";
import { checkUserSession } from "./redux/user/user-actions";
import { GlobalStyle } from "./globalStyles";

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={HomePage} />{" "}
        <Route path="/shop" component={ShopPage} />{" "}
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
          }
        />{" "}
        <Route exact path="/checkout" component={Checkout} />{" "}
      </Switch>{" "}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
