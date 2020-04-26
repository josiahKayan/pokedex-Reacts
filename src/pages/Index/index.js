import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import Pokemon from '../Pokemon/index';
import logoImg from '../../assets/pokedex.jpg';

export default function Index(){

    const [pokemonData,SetPokemonData] = useState([]);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

     useEffect(() => {
        
        async function loadPokemon(){
            try{
                let response = await api.get(initialUrl);
                setNextUrl(response.data.next);
                setPrevUrl(response.data.previous);
                let pokemon = await loadData(response.data.results);
            }
            catch(err){
                console.log(err);
            }
        }

        loadPokemon();

    },[]);

    async function loadData(pokemons){
        
        let t = await Promise.all( pokemons.map( async p =>{                
                let x = await api.get(p.url);
                return x;
            })
        ) 
                   
        SetPokemonData(...pokemonData,t);
    }

    async function loadData2(pokemons){
        
        let t = await Promise.all( pokemons.map( async p =>{                
                let x = await api.get(p.url);
                return x;
            })
        ) 
        
        // SetPokemonData(pokemonData.concat(t));
        SetPokemonData(t.filter( c => pokemonData.indexOf(c) === -1   ));

    }

    async function loadData3(pokemons){
        
        let t = await Promise.all( pokemons.map( async p =>{                
                let x = await api.get(p.url);
                return x;
            })
        ) 
           
        SetPokemonData(t.filter( c => pokemonData.indexOf(c) === -1   ));
    }

    async function prevPokemon(){
        if(prevUrl!=null){
            let response = await api.get(prevUrl);
            let pokemon = await loadData3(response.data.results);
            setNextUrl(response.data.next);
            setPrevUrl(response.data.previous);
        }
        else{
            alert('Nulo');
        }
    }
    
    async function nextPokemon(){
        if(nextUrl!=null){
            let response = await api.get(nextUrl);
            let pokemon = await loadData2(response.data.results);
            setNextUrl(response.data.next);
            setPrevUrl(response.data.previous);   
        }
        else{
            alert('Nulo');
        }
    }

    return(
        <div className="pokedex-container">
            <header>
                <h1>Pokedex</h1>
            </header>
            <div className="pokedex-container-pages">
                <button type="button" onClick={prevPokemon} className="prev">Prev</button>
                <button type="button" onClick={nextPokemon} className="next" >Next</button>
            </div>
            <ul>
                {
                    pokemonData.map(  (pokemon,i) =>{
                        
                            return <li key={i} className={""+pokemon.data.name} >
                                <Pokemon pokemon={pokemon.data} ></Pokemon>
                            </li>
                        
                    })
                }
                
            </ul>
            <div className="pokedex-container-pages">
                <button type="button" onClick={prevPokemon} className="prev">Prev</button>
                <button type="button" onClick={nextPokemon} className="next" >Next</button>
            </div>
        </div>

              
    )

}