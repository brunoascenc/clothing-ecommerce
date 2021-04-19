import React, {useEffect} from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import SignInAndSignUp from "./pages/signIn-signUp/signIn-signUp";
// import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
// import { setCurrentUser } from "./redux/user/user-actions";
import { selectCurrentUser } from "./redux/user/user-selector";
import Checkout from "./pages/checkout/Checkout";
import { checkUserSession } from "./redux/user/user-actions";
// import { selectCollectionsForPreview } from "./redux/shop/shop-selector";

const App = ({checkUserSession, currentUser}) => {
  useEffect(() =>{
    checkUserSession()
  }, [checkUserSession])

  // render() {
    return (
      <div>
        <Header />
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
  }
// }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
