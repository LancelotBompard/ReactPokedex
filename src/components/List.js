import React, { Component } from 'react';
import PokemonContainer from './PokemonContainer';
import axios from 'axios';

export default class List extends Component {
    state= {
        url: 'https://pokeapi.co/api/v2/pokemon/',
    };
    

    async componentDidMount() {
        const res = await axios.get(this.state.url);
        this.setState({ pokemon: res.data['results']});
      }
    
    render(){
        return (
        <div>
        {this.state.pokemon ? (
            <div className="row">
                {this.state.pokemon.map(pokemon => (
                    <PokemonContainer name={pokemon.name} url={pokemon.url} key={pokemon.name}/>
                ))}
            </div>
        ) : (
            <h1>Loading Pokemon</h1>
        )}
        </div>
        
    );
}}
    






