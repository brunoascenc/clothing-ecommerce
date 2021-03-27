import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import {createStructuredSelector} from 'reselect'
import { connect } from "react-redux";
import HomePage from "./pages/homepage/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import Header from "./components/header/Header";
import SignInAndSignUp from "./pages/signIn-signUp/signIn-signUp";
import { auth, createUserProfileDocument, addColletionAndDocuments } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user-actions";
import {selectCurrentUser} from './redux/user/user-selector'
import Checkout from "./pages/checkout/Checkout";
import { selectCollectionsForPreview } from "./redux/shop/shop-selector";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
          });
        });
      }

      setCurrentUser( userAuth );
      addColletionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
          <Route exact path='/checkout' component={Checkout}/>
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
