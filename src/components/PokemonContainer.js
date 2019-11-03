import React, { Component } from 'react';
import './style/PokemonContainer.css';
import { Link } from 'react-router-dom';


export default class PokemonContainer extends Component{
    state= {
        imageUrl: '',
        name: '',
    }

    componentDidMount(){
        const { name, url } = this.props;
        const pokemonIndex = url.split('/')[url.split('/').length - 2];  
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonIndex}.png` ;


        this.setState({
            name,
            imageUrl
        })
    }
    render(){
        return (
            <div className="col-4">
                <Link className="lienStyle" to={`/${this.state.name}`}  >
                    <div className="card mb-3">
                        <div className="card-header">
                        <h1>{this.state.name}</h1>
                        </div>
                        <div className="card-body mx-auto" >
                            <img alt="pokemon"
                            src={this.state.imageUrl}/>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
    
    }
    



