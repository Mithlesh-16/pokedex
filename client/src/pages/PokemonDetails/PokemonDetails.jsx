import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import './PokemonDetails.css';
import PokemonInfo from "./PokemonInfo.jsx";

function PokemonDetails(){
    let id = useParams().id;
    console.log(id);
    const [pokemonList, setPokemonList] = useState({
        pokemon: null,
        currId: id,
    })
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonList.currId}`;

    async function downloadPokemon(){
        const response = await axios.get(url);
        console.log(response.data);
        setPokemonList((state) => ({
            ...state,
            pokemon:{
                name: response.data.name,
                image: response.data.sprites.other['official-artwork'].front_default,
                height: response.data.height,
                weight: response.data.weight,
                types: response.data.types.map((t) => t.type.name),
                moves: response.data.moves.map((m) => m.move.name),
                abilities: response.data.abilities.map((a) => a.ability.name),
                stats: response.data.stats.map((s) => ({name: s.stat.name, value: s.base_stat})),
                species: response.data.species.name,
                id: pokemonList.currId
            }
        }))
    }
    
    useEffect(() => {
        downloadPokemon();
    },[pokemonList.currId]);

    return <>
    
    <PokemonInfo pokemon = {pokemonList.pokemon}/>

    <div className = "pagination-wrapper">
        <button disabled = {id < 2} onClick = {() => setPokemonList((state) => ({
            ...state,
            currId: Number(pokemonList.currId)-1,
        }))}>Prev</button>
        <button onClick = {() => setPokemonList((state) => ({
            ...state,
            currId: Number(pokemonList.currId)+1,
        }))}>Next</button>
    </div>
    </>
}
export default PokemonDetails;