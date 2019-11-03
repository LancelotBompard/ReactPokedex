import React, { Component } from 'react';
import './App.css';
import List from './components/List';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails';



class App extends Component{
  render(){
    return(
      <Router >
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path="/"  component={List} />
              <Route exact path="/:pokemonIndex" component={PokemonDetails} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

  

export default App;
