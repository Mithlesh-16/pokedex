
import "./Favorites.css";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DetailsCard, SummaryCard } from "./DetailsCard.jsx";

export default function Favorites() {
    const favorites = useMemo(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (!storedFavorites) return [];

        try {
            const parsedFavorites = JSON.parse(storedFavorites);
            return Array.isArray(parsedFavorites) ? parsedFavorites : [];
        } catch (error) {
            console.error("Unable to read favorites:", error);
            return [];
        }
    }, []);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [selectedProperty, setSelectedProperty] = useState("");
    const [sortBy, setSortBy] = useState("hp");
    const [sortOrder, setSortOrder] = useState("desc");
    const [expandedId, setExpandedId] = useState(null);

    const filterOptions = useMemo(() => {
        const types = new Set();
        const abilities = new Set();
        const species = new Set();
        const moves = new Set();

        favorites.forEach((pokemon) => {
            (pokemon.types || []).forEach((type) => {
                const name = typeof type === "string" ? type : type?.type?.name || type?.name;
                if (name) types.add(name);
            });

            (pokemon.abilities || []).forEach((ability) => {
                const name = typeof ability === "string" ? ability : ability?.ability?.name || ability?.name;
                if (name) abilities.add(name);
            });

            if (typeof pokemon.species === "string") {
                species.add(pokemon.species);
            } else if (pokemon.species?.name) {
                species.add(pokemon.species.name);
            }

            (pokemon.moves || []).forEach((move) => {
                const name = typeof move === "string" ? move : move?.move?.name || move?.name;
                if (name) moves.add(name);
            });
        });

        return {
            types: [...types].sort(),
            abilities: [...abilities].sort(),
            species: [...species].sort(),
            moves: [...moves].sort(),
        };
    }, [favorites]);

    function getStatValue(pokemon, statName) {
        if (!Array.isArray(pokemon?.stats)) return 0;
        const stat = pokemon.stats.find((item) => item?.name === statName);
        return Number(stat?.value ?? 0);
    }

    function getPropertyValues(pokemon, property) {
        if (property === "species") {
            const species = pokemon.species;
            if (typeof species === "string") return [species];
            return species?.name ? [species.name] : [];
        }

        const values = pokemon[property] || [];

        return values.map((item) => {
            if (typeof item === "string") return item;
            if (property === "types") {
                return item?.type?.name || item?.name || null;
            }
            if (property === "abilities") {
                return item?.ability?.name || item?.name || null;
            }
            if (property === "moves") {
                return item?.move?.name || item?.name || null;
            }
            return null;
        }).filter(Boolean);
    }

    const appliedFavorites = useMemo(() => {
        let result = [...favorites];

        if (searchQuery.trim()) {
            const query = searchQuery.trim().toLowerCase();

            result = result.filter((pokemon) =>
                (pokemon?.name || "").toLowerCase().includes(query) ||
                String(pokemon?.id ?? "").includes(query)
            );
        }

        if (selectedFilter && selectedProperty) {
            result = result.filter((pokemon) =>
                getPropertyValues(pokemon, selectedFilter).includes(selectedProperty)
            );
        }

        result.sort((a, b) => {
            if (sortBy === "name") {
                const nameA = a?.name?.toLowerCase() || "";
                const nameB = b?.name?.toLowerCase() || "";

                return sortOrder === "asc"
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
            }

            const valueA = sortBy === "id"
                ? Number(a?.id ?? 0)
                : getStatValue(a, sortBy);

            const valueB = sortBy === "id"
                ? Number(b?.id ?? 0)
                : getStatValue(b, sortBy);

            return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        });

        return result;
    }, [favorites, searchQuery, selectedFilter, selectedProperty, sortBy, sortOrder]);

    function resetFilters() {
        setSearchQuery("");
        setSelectedFilter("");
        setSelectedProperty("");
        setSortBy("hp");
        setSortOrder("desc");
        setExpandedId(null);
    }

    function handleFilterChange(event) {
        setSelectedFilter(event.target.value);
        setSelectedProperty("");
    }

    const hasActiveFilters =
        searchQuery.trim() !== "" ||
        selectedFilter !== "" ||
        selectedProperty !== "";

    return (
        <main className="favorites-wrapper">
            <section className="favorites-hero">
                <div className="hero-decoration hero-dot-one"></div>
                <div className="hero-decoration hero-dot-two"></div>
                <div className="hero-pokeball"></div>

                <div className="favorites-title">
                    <span className="favorites-eyebrow">POKÉDEX • COLLECTION</span>
                    <h1>My Favorite Pokémon</h1>
                    <p>Your personal collection of Pokémon, ready to explore.</p>
                </div>

                <div className="favorites-count-card">
                    <span className="count-number">{favorites.length}</span>
                    <span className="count-label">FAVORITES</span>
                </div>
            </section>

            <section className="favorites-controls">
                <div className="favorites-search">
                    <span className="search-icon">⌕</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Pokémon by name or number..."
                        aria-label="Search Pokémon"
                    />
                    {searchQuery && (
                        <button
                            className="clear-search"
                            onClick={() => setSearchQuery("")}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="filter-group">
                    <div className="control-label">FILTER</div>
                    <div className="select-row">
                        <div className="select-wrapper">
                            <select value={selectedFilter} onChange={handleFilterChange}>
                                <option value="">Filter by...</option>
                                <option value="types">Type</option>
                                <option value="moves">Move</option>
                                <option value="abilities">Ability</option>
                                <option value="species">Species</option>
                            </select>
                        </div>

                        {selectedFilter && (
                            <div className="select-wrapper property-select">
                                <select
                                    value={selectedProperty}
                                    onChange={(e) => setSelectedProperty(e.target.value)}
                                >
                                    <option value="">Select {selectedFilter}</option>
                                    {filterOptions[selectedFilter]?.map((property) => (
                                        <option key={property} value={property}>
                                            {property}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                <div className="sort-group">
                    <div className="control-label">SORT BY</div>
                    <div className="select-row">
                        <div className="select-wrapper">
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="name">Name</option>
                                <option value="id">Pokédex Number</option>
                                <option value="hp">HP</option>
                                <option value="attack">Attack</option>
                                <option value="defense">Defense</option>
                                <option value="special-attack">Special Attack</option>
                                <option value="special-defense">Special Defense</option>
                                <option value="speed">Speed</option>
                            </select>
                        </div>

                        <button
                            className="sort-direction"
                            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                            title={sortOrder === "asc" ? "Ascending" : "Descending"}
                        >
                            {sortOrder === "asc" ? "↑" : "↓"}
                        </button>
                    </div>
                </div>

                <button
                    className={`reset-button ${hasActiveFilters ? "active" : ""}`}
                    onClick={resetFilters}
                >
                    <span>↻</span> Reset
                </button>

                <Link className="back-home-button" to="/">
                    Back to Home
                </Link>
            </section>

            {hasActiveFilters && (
                <div className="active-filter-bar">
                    <div className="active-filter-status">
                        <span className="status-dot"></span>
                        <span>Filters active</span>
                    </div>

                    {searchQuery && (
                        <span className="filter-chip">
                            Search: <strong>"{searchQuery}"</strong>
                        </span>
                    )}

                    {selectedProperty && (
                        <span className="filter-chip">
                            {selectedFilter}: <strong>{selectedProperty}</strong>
                        </span>
                    )}
                </div>
            )}

            <section className="favorites-results-header">
                <div>
                    <span className="results-eyebrow">YOUR COLLECTION</span>
                    <h2>Pokémon</h2>
                </div>

                <div className="results-count">
                    <strong>{appliedFavorites.length}</strong>
                    <span>{appliedFavorites.length === 1 ? "favorite" : "favorites"}</span>
                </div>
            </section>

            <section className="favorites-body">
                {appliedFavorites.length > 0 ? (
                    appliedFavorites.map((pokemon, index) => (
                        <div
                            key={pokemon.id}
                            className={`favorite-card-wrapper ${expandedId === pokemon.id ? "expanded" : ""}`}
                            style={{ "--card-index": index }}
                        >
                            {expandedId === pokemon.id ? (
                                <DetailsCard
                                    pokemon={pokemon}
                                    onExpand={() => setExpandedId(null)}
                                />
                            ) : (
                                <SummaryCard
                                    pokemon={pokemon}
                                    onExpand={() => setExpandedId(pokemon.id)}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="favorites-empty">
                        <div className="empty-pokeball">
                            <div className="empty-pokeball-line"></div>
                            <div className="empty-pokeball-center"></div>
                        </div>

                        <h3>No Pokémon found</h3>
                        <p>
                            {favorites.length === 0
                                ? "Your favorite Pokémon will appear here."
                                : "Try changing your search or filters."}
                        </p>

                        {hasActiveFilters && (
                            <button className="empty-reset-button" onClick={resetFilters}>
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}
            </section>

            <footer className="favorites-footer">
                <div className="footer-decoration"></div>
                <span>
                    Showing <strong>{appliedFavorites.length}</strong> of{" "}
                    <strong>{favorites.length}</strong> Favorites
                </span>
            </footer>
        </main>
    );
}
