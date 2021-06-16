import * as React from 'react';
import './App.css';
import './components/Browse'
import BrowsePage from './components/Browse';
import Details from './components/Details'
import Basket from './components/Basket'
import {Route, Switch} from 'react-router-dom';

function handleLink(nav) {
  window.location.href = nav;
  console.log('The link was clicked')
}

function App () {
  return(
    <main>
    <Switch>
        <Route path="/"component={BrowsePage} exact/>
        <Route path="/details/:id"component={Details} exact/>
        <Route path="/basket/:id"component={Basket} exact/>
        
    </Switch>
    </main>
  )
};


  export default App