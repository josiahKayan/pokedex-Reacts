import React, {useEffect, useState} from 'react';
// import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
 
// https://www.youtube.com/watch?v=HaEB0vdxpdg&t=1258s

function Pokemon({pokemon}){

    function FirstLetter(string,i) {
        if(i==0){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        else{
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
      

    return(
        <div className="pokedex-div">   
            <img src={pokemon.sprites.front_default}></img>
            <p>{pokemon.id}-{FirstLetter(pokemon.name)}</p>
            <div className="pokedex-div-types">
                {
                    pokemon.types.map( (p,i) =>(
                        <span key={i} className={"span-"+i+" "+"type-"+p.type.name}>
                        {FirstLetter(p.type.name,i)}
                        </span>
                    ))
                }
            </div>
        </div>
    )

}

export default Pokemon;