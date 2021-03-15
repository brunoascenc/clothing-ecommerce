import './App.css';
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header';
import signInAndSignUp from './pages/signIn-signUp/signIn-signUp';

function App() {
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

export default App;
