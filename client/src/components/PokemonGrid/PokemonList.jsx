
import Pokemon from '../PokemonCard/Pokemon.jsx';
import './PokemonList.css';
import usePokemonList from '../../hooks/UsePokemonList.jsx';
import Error from '../Error/Error.jsx';

function PokemonList({ SearchValue }) {

    const {
        pokemonListState,
        setPokemonListState,
        loadMore
    } = usePokemonList();

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

    // Normalize search input
    const searchQuery = (SearchValue ?? "")
        .trim()
        .toLowerCase();

    // Filter Pokémon
    const filteredPokemon = pokemonList.filter((pokemon) => {

        const pokemonName = pokemon.name.toLowerCase();
        const pokemonId = pokemon.id.toString();

        return (
            pokemonName.includes(searchQuery) ||
            pokemonId === searchQuery
        );
    });

    return (
        <main className="pokemon-list-page">

            {/* LIST HEADER */}

            <section className="pokemon-list-header">

                <div className="pokemon-list-heading">

                    <span className="pokemon-list-label">
                        Pokédex / Collection
                    </span>

                    <div className="pokemon-list-title-row">

                        <h1>
                            Explore <span>Pokémon</span>
                        </h1>

                        <span className="pokemon-count">
                            {filteredPokemon.length}
                        </span>

                    </div>

                    <p>
                        Discover Pokémon, explore their abilities,
                        stats, types and more.
                    </p>

                </div>

                <div className="pokemon-list-summary">

                    <span className="summary-number">
                        {pokemonList.length}
                    </span>

                    <span className="summary-label">
                        Loaded
                    </span>

                </div>

            </section>


            {/* POKÉMON GRID */}

            <section className="pokemon-list-container">

                <div className="pokemon-list-toolbar">

                    <span>
                        <strong>{filteredPokemon.length}</strong>
                        {" "}Pokémon found
                    </span>

                    {searchQuery && (
                        <span className="search-indicator">
                            Results for "{SearchValue}"
                        </span>
                    )}

                </div>


                {filteredPokemon.length > 0 ? (

                    <div className="Pokemon-wrapper">

                        {filteredPokemon.map((pokemon) => (

                            <Pokemon
                                pokemon={pokemon}
                                key={pokemon.id}
                            />

                        ))}

                    </div>

                ) : (

                    <div className="pokemon-empty-state">

                        <span className="empty-icon">
                            <i className="fa-solid fa-magnifying-glass" />
                        </span>

                        <h3>No Pokémon found</h3>

                        <p>
                            Try searching with another Pokémon name or ID.
                        </p>

                    </div>

                )}

            </section>


            {/* PAGINATION */}

            <nav className="pagination-wrapper">

                <button
                    className="pagination-btn pagination-secondary"
                    disabled={!prevUrl || isLoading}
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


                <button
                    onClick={loadMore}
                    className="load-more-btn"
                    disabled={!nextUrl || isLoading}
                >
                    {isLoading ? "Loading..." : "Explore more"}
                    <span>↓</span>
                </button>


                <button
                    className="pagination-btn pagination-secondary"
                    disabled={!nextUrl || isLoading}
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
