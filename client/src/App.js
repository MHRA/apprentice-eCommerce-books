import * as React from 'react';
import './App.css';
import './components/Browse'
import BrowsePage from './components/Browse';
import SearchForBook from './components/SearchForBook';
import Details from './components/Details'
import {Route, Switch} from 'react-router-dom';

function App () {
  return(
    <main>
      <SearchForBook/>
    <Switch>
        <Route path="/"component={BrowsePage} exact/>
        <Route path="/details/:id"component={Details} exact/>
        
    </Switch>
    </main>
  )
};


  export default App