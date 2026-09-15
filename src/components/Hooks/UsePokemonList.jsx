import {useState, useEffect} from "react";
import axios from "axios";

function usePokemonList(){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList:[],
        isLoading: true,
        url:"https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
        nextUrl: "", 
        prevUrl: ""
    })

    async function downloadPokemonList(){
        const response = await axios.get(pokemonListState.url)
        setPokemonListState((state) => ({
            ...state, 
            nextUrl: response.data.next,
            prevUrl: response.data.previous,
            isLoading: false
        }))

        const res = response.data.results.map(async (r) => await axios.get(r.url));
        const results = await Promise.all(res);
        const list = results.map((r) => ({
            name: r.data.name,
            image: r.data.sprites.other['official-artwork'].front_default,
            id: r.data.id,
        }))
        setPokemonListState((state) => ({
            ...state,
            pokemonList: list
    
        }))
    }
    useEffect(() => {
        downloadPokemonList();
    }, [pokemonListState.url]);
    return {pokemonListState, setPokemonListState};
}


export default usePokemonList;