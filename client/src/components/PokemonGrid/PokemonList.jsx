import Pokemon from '../PokemonCard/Pokemon.jsx';
import './PokemonList.css';
import usePokemonList from '../../hooks/UsePokemonList.jsx';
import Loader from '../Loader/Loader.jsx';
import Error from '../Error/Error.jsx';

function PokemonList() {
    const {pokemonListState, setPokemonListState} = usePokemonList();
    const {pokemonList, isLoading, url, nextUrl, prevUrl,error} = pokemonListState;
    console.log(pokemonListState.isLoading);
    if(isLoading){
        return <Loader/>;
    }
    if(error){
        return(
            <Error
            title = "Unable to Load Pokémon"
            message = {error}
            />
        );
    }
    return (
        <>
        <div className = "pokemon-list-wrapper">
            <div className='Pokemon-wrapper'>  
                {pokemonList.map((p) => <Pokemon name = {p.name} image = {p.image} id = {p.id} key = {p.id} types = {p.types} moves={p.moves} abilities={p.abilities} stats={p.stats} species={p.species}/>)}
            </div>

            <div className = "pagination-wrapper">
            <button disabled = {!prevUrl} onClick = {() => setPokemonListState((state) => ({...state, url:prevUrl, pokemonList: []}))}>Prev</button>
            <button disabled = {nextUrl == null} onClick = {() => setPokemonListState((state) => ({...state, url:nextUrl, pokemonList: []}))}>Next</button>
            </div>
            
        </div>
        </>
    )
}

export default PokemonList;