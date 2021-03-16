import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header';
import signInAndSignUp from './pages/signIn-signUp/signIn-signUp';
import {auth} from './firebase/firebase.utils'


class App extends React.Component {
  constructor(){
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount(){
   this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})

      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }


  render(){
    return (
      <div>
        <Header/>
        <Switch>
           <Route exact path='/' component={HomePage}/>
           <Route exact path='/shop' component={ShopPage}/>
           <Route exact path='/signin' component={signInAndSignUp}/>
        </Switch>
      </div>
    );

  }
}

export default App;
