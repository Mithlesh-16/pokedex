import {useEffect, useState} from 'react';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon.jsx';
import './PokemonList.css';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextUrl, setNextUrl] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');

    async function fetchPokemonData(){
        setLoading(true);
        const response = await axios.get(url); // this will give us the list of pokemon with their urls to fetch more data
        setNextUrl(response.data.next);
        setPreviousUrl(response.data.previous);

        let pokemonData = response.data.results;
        // we will use axios.all to fetch all the pokemon data
        pokemonData = await axios.all(pokemonData.map((p) => axios.get(p.url)));
        // this is the array of 20 pokemon data
        
        const res = pokemonData.map((pokedata) => {
            const pokemon = pokedata.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other['official-artwork'].front_default,
                type: pokemon.types
            }
        })
        setPokemonList(res);
        console.log(res);
        console.log(pokemonData);
        setLoading(false);
    }
    useEffect( () => {
        fetchPokemonData();
    }, [url])

    return (
        <>
        <div className = "pokemon-list-wrapper">
            <div className='Pokemon-wrapper'>
                {(loading) ? 'loading ...' : ''};
                {pokemonList.map((p) => <Pokemon name = {p.name} image = {p.image} id = {p.id} key = {p.id}/>)}
            </div>

            <div className = "pagination-wrapper">
            <button disabled = {previousUrl == null} onClick = {() => setUrl(previousUrl)}>Prev</button>
            <button disabled = {nextUrl == null} onClick = {() => setUrl(nextUrl)}>Next</button>
            </div>
            
        </div>
        </>
    )
}

export default PokemonList;