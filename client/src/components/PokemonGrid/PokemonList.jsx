import Pokemon from '../PokemonCard/Pokemon.jsx';
import './PokemonList.css';
import usePokemonList from '../../hooks/UsePokemonList.jsx';
import Loader from '../Loader/Loader.jsx';
import Error from '../Error/Error.jsx';

function PokemonList() {
    const { pokemonListState, setPokemonListState } = usePokemonList();

    const {
        pokemonList,
        isLoading,
        nextUrl,
        prevUrl,
        error
    } = pokemonListState;

    if (isLoading) {
        return <Loader />;
    }

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
                    <span>{pokemonList.length}</span>
                    <small>Pokémon</small>
                </div>
            </section>


            {/* Pokémon Grid */}
            <section className="pokemon-list-container">
                <div className="Pokemon-wrapper">
                    {pokemonList.map((pokemon) => (
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
                            pokemonList: []
                        }))
                    }
                >
                    <span>←</span>
                    Previous
                </button>


                <div className="pagination-info">
                    <span>Explore more</span>
                </div>


                <button
                    className="pagination-btn"
                    disabled={!nextUrl}
                    onClick={() =>
                        setPokemonListState((state) => ({
                            ...state,
                            url: nextUrl,
                            pokemonList: []
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