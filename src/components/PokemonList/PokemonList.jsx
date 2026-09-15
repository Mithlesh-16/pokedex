import Pokemon from '../Pokemon/Pokemon.jsx';
import './PokemonList.css';
import usePokemonList from '../Hooks/UsePokemonList.jsx';

function PokemonList() {
    const {pokemonListState, setPokemonListState} = usePokemonList();
    const {pokemonList, isLoading, url, nextUrl, prevUrl} = pokemonListState;
    return (
        <>
        <div className = "pokemon-list-wrapper">
            <div className='Pokemon-wrapper'>
                {(isLoading) ? 'loading ...' : ''};
                <h1>{pokemonList.length}</h1>
               
                {pokemonList.map((p) => <Pokemon name = {p.name} image = {p.image} id = {p.id} key = {p.id}/>)}
            </div>

            <div className = "pagination-wrapper">
            <button disabled = {!prevUrl} onClick = {() => setPokemonListState((state) => ({...state, url:prevUrl}))}>Prev</button>
            <button disabled = {nextUrl == null} onClick = {() => setPokemonListState((state) => ({...state, url:nextUrl}))}>Next</button>
            </div>
            
        </div>
        </>
    )
}

export default PokemonList;