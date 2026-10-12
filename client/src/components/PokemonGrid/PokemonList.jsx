import Pokemon from '../PokemonCard/Pokemon.jsx';
import './PokemonList.css';
import usePokemonList from '../../hooks/UsePokemonList.jsx';
import Loader from '../Loader/Loader.jsx';
import Error from '../Error/Error.jsx';


function PokemonList({SearchValue}) {
    const { pokemonListState, setPokemonListState, loadMore} = usePokemonList();

    const {
        pokemonList,
        isLoading,
        nextUrl,
        prevUrl,
        error
    } = pokemonListState;

    if (error) {
        return (
            <Error
                title="Unable to Load Pokémon"
                message={error}
            />
        );
    }

    return (
        <main className="pokemon-list-page">
            
            {/* Page Header */}
            <section className="pokemon-list-header">
                <div>
                    <span className="pokemon-list-label">
                        Pokédex
                    </span>

                    <h1>
                        Explore Pokémon
                    </h1>

                    <p>
                        Discover Pokémon, explore their abilities,
                        stats, types and more.
                    </p>
                </div>

                <div className="pokemon-count">
                    <span>{pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(SearchValue) || pokemon.id.toString() === SearchValue).length}</span>
                    <small>Pokémon</small>
                </div>
            </section>


            {/* Pokémon Grid */}
            <section className="pokemon-list-container">
                <div className="Pokemon-wrapper">
                    
                        {pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(SearchValue) || pokemon.id.toString() === SearchValue)
                    .map((pokemon) => (
                        <Pokemon
                            pokemon={pokemon}
                            key={pokemon.id}
                            />
                    ))}
                    
                </div>
            </section>


            {/* Pagination */}
            <nav className="pagination-wrapper">

                <button
                    className="pagination-btn"
                    disabled={!prevUrl}
                    onClick={() =>
                        setPokemonListState((state) => ({
                            ...state,
                            url: prevUrl,
                        }))
                    }
                >
                    <span>←</span>
                    Previous
                </button>


                <div className="pagination-info">
                    <button onClick={loadMore} className="load-more-btn">
                        Explore more
                    </button>
                </div>


                <button
                    className="pagination-btn"
                    disabled={!nextUrl}
                    onClick={() =>
                        setPokemonListState((state) => ({
                            ...state,
                            url: nextUrl,
                        }))
                    }
                >
                    Next
                    <span>→</span>
                </button>

            </nav>

        </main>
    );
}

export default PokemonList;