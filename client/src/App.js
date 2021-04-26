import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Header from "./components/header/Header";
import { selectCurrentUser } from "./redux/user/user-selector";
import { checkUserSession } from "./redux/user/user-actions";
import { GlobalStyle } from "./globalStyles";
import Spinner from "./components/spinner/spinner-component";
const HomePage = lazy(() => import("./pages/homepage/HomePage"));
const ShopPage = lazy(() => import("./pages/shop/ShopPage"));
const SignInAndSignUp = lazy(() =>
  import("./pages/signIn-signUp/signIn-signUp")
);
const Checkout = lazy(() => import("./pages/checkout/Checkout"));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <GlobalStyle />
      <Switch>
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
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
