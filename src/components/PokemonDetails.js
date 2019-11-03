import React, { Component } from  'react';
import axios from 'axios';

export default class PokemonDetails extends Component {

    state = {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        stats: {
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            specialAttack: "",
            specialDefense: ""
        },
        height: "",
        weight: "",
        eggGroup: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: "",
        hatchSteps: ""
        };


        async componentDidMount(){
            const { pokemonIndex } = this.props.match.params;
            const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
            const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;
    
            const resPokemon = await axios.get(pokemonUrl);
    
            const name = resPokemon.data.name;
            const imageUrl = resPokemon.data.sprites.front_default;
    
            let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

            resPokemon.data.stats.map(stat => {
                switch(stat.stat.name) {
                    case 'hp' :
                        hp = stat['base_stat'];
                        break;
                        case 'attack' :
                        attack = stat['base_stat'];
                        break;
                        case 'defense' :
                        defense = stat['base_stat'];
                        break;
                        case 'speed' :
                        speed = stat['base_stat'];
                        break;
                        case 'special-attack' :
                        specialAttack = stat['base_stat'];
                        break;
                        case 'special-defense' :
                        specialDefense = stat['base_stat'];
                        break;
                }
            });

            const height = Math.round((resPokemon.data.height * 10));
            const weight = Math.round((resPokemon.data.weight * 10));

            const types = resPokemon.data.types.map(type => type.type.name);
            const abilities = resPokemon.data.abilities.map(ability => {
                return ability.ability.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
                });

            const evs = resPokemon.data.stats
            .filter(stat => {
                if (stat.effort > 0 ) {
                    return true;
                }
                return false;
            })
            .map(stat => {
                return `${stat.effort} ${stat.stat.name}`
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
            })
            .join(', ')

            await axios.get(pokemonSpeciesUrl).then(res => {
                let description = '';
                res.data.flavor_text_entries.some(flavor => {
                    if (flavor.language.name === 'en') {
                        description = flavor.flavor_text;
                        return;
                    }
                });

            const ratioFemale = resPokemon.data['gender_rate'];
            const genderRatioFemale = 12.5 * ratioFemale;
            const genderRatioMale = 12.5 * (8 - ratioFemale);

            const catchRate = Math.round((100 / 255) * res.data['capture_rate']);
            const eggGroups = res.data['egg_groups'].map(group => {
                return group.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
                })
                .join(', ');
                
                const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

                this.setState({
                    description,
                    genderRatioMale,
                    genderRatioFemale,
                    eggGroups,
                    hatchSteps,
                    catchRate
                });
            });

            this.setState({
                imageUrl,
                pokemonIndex,
                name,
                types,
                stats: {
                    hp,
                    attack,
                    defense,
                    speed,
                    specialAttack,
                    specialDefense
                },
                height,
                weight,
                abilities,
                evs
            })
            }
            
    
        render(){
            return(
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-4">
                                    <h3>{this.state.name}</h3>
                                </div>
                                <div className="col-8">
                                    <h6 className="float-right mt-2 badge badge-pill bg-secondary">type : {this.state.types}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <img className="ml-4 mt-4"src={this.state.imageUrl}></img>
                                </div>
                                <div className="col-8">
                                    <h2>
                                        Main Stats
                                    </h2>

                                    <div className="row">
                                        <div className="col-3">hp</div>
                                        <div className="col-9">{this.state.stats.hp}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">Defense</div>
                                        <div className="col-9">{this.state.stats.defense}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">Speed</div>
                                        <div className="col-9">{this.state.stats.speed}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">Attack</div>
                                        <div className="col-9">{this.state.stats.attack}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">Special attack</div>
                                        <div className="col-9">{this.state.stats.specialAttack}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">Special defense</div>
                                        <div className="col-9">{this.state.stats.specialDefense }</div>
                                    </div>

                                </div>
                                <div className="row mt-4">
                                    <div className="col ml-3">
                                        <p>Description : {this.state.description}</p>
                                    </div>
                                </div>

                                
                                
                            </div>
                            <div className="row">
                                <div className="card-body text-center">
                                        <h2>Other stats</h2>
                                </div>
                            </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-6">
                                                <h6 className="float-right">Height:</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="float-left">{this.state.height} cm</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-6">
                                                <h6 className="float-right">Weight:</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="float-left">{this.state.weight} </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-6">
                                                <h6 className="float-right">CatchRate:</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="float-left">{this.state.catchRate}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-6">
                                                <h6 className="float-right">EggGroup:</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="float-left">{this.state.eggGroups}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col-6">
                                                <h6 className="float-right">EVS:</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="float-left">{this.state.evs}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            <div className="row">
                                <div className="card-body text-center">
                                        <h2>Abilities</h2>
                                </div>
                            </div>

                            <div className="row">
                                <div className="card-body text-center">
                                    <h4 >{this.state.abilities}</h4>                                  
                                </div>
                            </div>
                                
                        </div>    
                    </div>                    
                </div>
            );
        }
    }

    

    