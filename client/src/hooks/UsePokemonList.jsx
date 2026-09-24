import {useState, useEffect} from "react";
import axios from "axios";

function usePokemonList(){
    const [pokemonListState,        setPokemonListState] = useState({
        pokemonList:[],
        isLoading: true,
        url:"https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
        nextUrl: "", 
        prevUrl: "",
        error: null
    })
        async function downloadPokemonList(){
        try{
            setPokemonListState((state) => ({
                ...state,
                isLoading: true
            }))
            const response = await axios.get(pokemonListState.url)
            // await new Promise(resolve => setTimeout(resolve, 1000));

            const res = response.data.results.map(async (r) => await axios.get(r.url));
            const results = await Promise.all(res);
            const list = results.map((r) => ({
                name: r.data.name,
                image: r.data.sprites.other['official-artwork'].front_default,
                id: r.data.id,
                types: r.data.types.map((t) => t.type.name),
                moves: r.data.moves.map((m) => m.move.name),
                abilities: r.data.abilities.map((a) => a.ability.name),
                stats: r.data.stats.map((s) => ({name: s.stat.name, value: s.base_stat})),
                species: r.data.species.name
            }))
            setPokemonListState((state) => ({
                ...state,
                pokemonList: list,
                nextUrl: response.data.next,
                prevUrl: response.data.previous,
                isLoading: false
        
            }))
        }
        catch(e){
            console.error(e.message);
            setPokemonListState((state) => ({
                ...state,
                error: e.message,
                isLoading: false
            }));
        }
    }
    
    
    useEffect(() => {
        downloadPokemonList();
    }, [pokemonListState.url]);
    return {pokemonListState, setPokemonListState};
}


export default usePokemonList;