import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import './PokemonDetails.css';

function PokemonDetails(){
    let {id} = useParams();
    // const [pokemon, setPokemon] = useState(null);
    // const [previousUrl, setPreviousUrl] = useState("");
    // const [nextUrl, setNextUrl] = useState("");
    // const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${id}`);
    // const [pokemonId, setPokemonId] = useState(id);

    const [pokemonListState, setPokemonListState] = useState({
        pokemon: null,
        previousUrl: "", 
        nextUrl: "",
        url: `https://pokeapi.co/api/v2/pokemon/${id}`, 
        pokemonId: id
    });
    console.log(id);
    async function downloadPokemon(){
        const response =await axios.get(pokemonListState.url);
        let id = (Number(response.data.id));
        setPokemonListState((state) => ({
            ...state,
            pokemon: {
                name: response.data.name,
                image: response.data.sprites.other['official-artwork'].front_default,
                height: response.data.height,
                weight: response.data.weight,
                type: response.data.types.map((t) => t.type.name)
            },
            previousUrl: `https://pokeapi.co/api/v2/pokemon/${id-1}`,
            nextUrl: `https://pokeapi.co/api/v2/pokemon/${id+1}`,
        }))
        console.log(response.data);
        // setPokemon({
        //     name: response.data.name,
        //     image: response.data.sprites.other['official-artwork'].front_default,
        //     height: response.data.height,
        //     weight: response.data.weight,
        //     type: response.data.types.map((t) => t.type.name)
        // })
     }
    useEffect(() => {
        downloadPokemon();
    }, [pokemonListState.url]);
    
    return <>
    <div className="Pokemon-details-wrapper">
        <img className="Pokemon-image" src={pokemonListState.pokemon?.image} alt="pokemon img"/>
        <div className="Pokemon-name">{pokemonListState.pokemon?.name}</div>
        <div className="Pokemon-height">Height: {pokemonListState.pokemon?.height}</div>
        <div className="Pokemon-weight">Weight: {pokemonListState.pokemon?.weight}</div>
    <div className="Pokemon-type">{pokemonListState.pokemon?.type?.map((t) => <div key={t}>
            {t}
        </div>)}</div>
        <div className = "pagination-wrapper">
            <button disabled = {pokemonListState.pokemonId < 2} onClick = {() => setPokemonListState((state) => ({
                ...state,
                url: state.previousUrl
            }))}>Prev</button>
            <button onClick = {() => setPokemonListState((state) => ({
                ...state,
                url: state.nextUrl
            }))}>Next</button>
        </div>
    </div>
    </>
}
export default PokemonDetails;