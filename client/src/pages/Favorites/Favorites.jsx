/*
----------------------------------------------------
                FAVORITES PAGE
----------------------------------------------------

My Favorite Pokémon

[ Search Pokémon........................ ]

[ Filter ▼ ] [ Property ▼ ]

[ Sort By ▼ ] [ ↑ Ascending ] [ Reset ]

----------------------------------------------------

▶ Pikachu              #025
▶ Charizard            #006
▼ Gengar               #094

----------------------------------------------------

Showing 3 Favorites
----------------------------------------------------
*/

import "./Favorites.css";
import { useMemo, useState } from "react";
import { DetailsCard, SummaryCard } from "./DetailsCard.jsx";


export default function Favorites() {

    /* =====================================================
       GET FAVORITES
    ===================================================== */

    const favorites = useMemo(() => {

        const storedFavorites =
            localStorage.getItem("favorites");

        if (!storedFavorites) {
            return [];
        }

        try {
            const parsedFavorites =
                JSON.parse(storedFavorites);

            return Array.isArray(parsedFavorites)
                ? parsedFavorites
                : [];

        } catch (error) {

            console.error(
                "Unable to read favorites:",
                error
            );

            return [];
        }

    }, []);


    /* =====================================================
       STATES
    ===================================================== */

    const [searchQuery, setSearchQuery] = useState("");

    const [selectedFilter, setSelectedFilter] =
        useState("");

    const [selectedProperty, setSelectedProperty] =
        useState("");

    const [sortBy, setSortBy] =
        useState("hp");

    const [sortOrder, setSortOrder] =
        useState("desc");

    const [expandedId, setExpandedId] =
        useState(null);


    /* =====================================================
       CREATE FILTER OPTIONS
    ===================================================== */

    const filterOptions = useMemo(() => {

        const types = new Set();
        const abilities = new Set();
        const species = new Set();
        const moves = new Set();

        favorites.forEach((pokemon) => {

            /* ---------- Types ---------- */

            if (Array.isArray(pokemon.types)) {

                pokemon.types.forEach((type) => {

                    if (typeof type === "string") {

                        types.add(type);

                    } else if (type?.type?.name) {

                        types.add(type.type.name);

                    } else if (type?.name) {

                        types.add(type.name);

                    }

                });

            }


            /* ---------- Abilities ---------- */

            if (Array.isArray(pokemon.abilities)) {

                pokemon.abilities.forEach((ability) => {

                    if (typeof ability === "string") {

                        abilities.add(ability);

                    } else if (ability?.ability?.name) {

                        abilities.add(
                            ability.ability.name
                        );

                    } else if (ability?.name) {

                        abilities.add(
                            ability.name
                        );

                    }

                });

            }


            /* ---------- Species ---------- */

            if (pokemon.species) {

                if (typeof pokemon.species === "string") {

                    species.add(pokemon.species);

                } else if (pokemon.species?.name) {

                    species.add(
                        pokemon.species.name
                    );

                }

            }


            /* ---------- Moves ---------- */

            if (Array.isArray(pokemon.moves)) {

                pokemon.moves.forEach((move) => {

                    if (typeof move === "string") {

                        moves.add(move);

                    } else if (move?.move?.name) {

                        moves.add(move.move.name);

                    } else if (move?.name) {

                        moves.add(move.name);

                    }

                });

            }

        });


        return {
            types: [...types].sort(),
            abilities: [...abilities].sort(),
            species: [...species].sort(),
            moves: [...moves].sort()
        };

    }, [favorites]);


    /* =====================================================
       GET STAT VALUE
    ===================================================== */

    function getStatValue(pokemon, statName) {

        if (!Array.isArray(pokemon?.stats)) {
            return 0;
        }

        const stat = pokemon.stats.find(
            (stat) => stat?.name === statName
        );

        return Number(stat?.value ?? 0);
    }


    /* =====================================================
       GET PROPERTY VALUE
    ===================================================== */

    function getPropertyValues(pokemon, property) {

        if (property === "types") {

            return (pokemon.types || []).map((type) => {

                if (typeof type === "string") {
                    return type;
                }

                if (type?.type?.name) {
                    return type.type.name;
                }

                if (type?.name) {
                    return type.name;
                }

                return null;

            }).filter(Boolean);

        }


        if (property === "abilities") {

            return (pokemon.abilities || []).map((ability) => {

                if (typeof ability === "string") {
                    return ability;
                }

                if (ability?.ability?.name) {
                    return ability.ability.name;
                }

                if (ability?.name) {
                    return ability.name;
                }

                return null;

            }).filter(Boolean);

        }


        if (property === "moves") {

            return (pokemon.moves || []).map((move) => {

                if (typeof move === "string") {
                    return move;
                }

                if (move?.move?.name) {
                    return move.move.name;
                }

                if (move?.name) {
                    return move.name;
                }

                return null;

            }).filter(Boolean);

        }


        if (property === "species") {

            if (typeof pokemon.species === "string") {
                return [pokemon.species];
            }

            if (pokemon.species?.name) {
                return [pokemon.species.name];
            }

            return [];

        }


        return [];

    }


    /* =====================================================
       APPLY SEARCH + FILTER + SORT
    ===================================================== */

    const appliedFavorites = useMemo(() => {

        let result = [...favorites];


        /* =================================================
           SEARCH
        ================================================= */

        if (searchQuery.trim()) {

            const query =
                searchQuery
                    .trim()
                    .toLowerCase();

            result = result.filter((pokemon) => {

                const name =
                    pokemon?.name
                        ?.toLowerCase() || "";

                const id =
                    String(pokemon?.id ?? "");

                return (
                    name.includes(query) ||
                    id.includes(query)
                );

            });

        }


        /* =================================================
           PROPERTY FILTER
        ================================================= */

        if (
            selectedFilter &&
            selectedProperty
        ) {

            result = result.filter((pokemon) => {

                const values =
                    getPropertyValues(
                        pokemon,
                        selectedFilter
                    );

                return values.includes(
                    selectedProperty
                );

            });

        }


        /* =================================================
           SORT
        ================================================= */

        result.sort((a, b) => {

            let valueA;
            let valueB;


            if (sortBy === "name") {

                valueA =
                    a?.name?.toLowerCase() || "";

                valueB =
                    b?.name?.toLowerCase() || "";

                return sortOrder === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);

            }


            if (sortBy === "id") {

                valueA =
                    Number(a?.id ?? 0);

                valueB =
                    Number(b?.id ?? 0);

            } else {

                valueA =
                    getStatValue(
                        a,
                        sortBy
                    );

                valueB =
                    getStatValue(
                        b,
                        sortBy
                    );

            }


            return sortOrder === "asc"
                ? valueA - valueB
                : valueB - valueA;

        });


        return result;

    }, [
        favorites,
        searchQuery,
        selectedFilter,
        selectedProperty,
        sortBy,
        sortOrder
    ]);


    /* =====================================================
       RESET
    ===================================================== */

    function resetFilters() {

        setSearchQuery("");

        setSelectedFilter("");

        setSelectedProperty("");

        setSortBy("hp");

        setSortOrder("desc");

        setExpandedId(null);

    }


    /* =====================================================
       HANDLE FILTER CHANGE
    ===================================================== */

    function handleFilterChange(event) {

        setSelectedFilter(
            event.target.value
        );

        setSelectedProperty("");

    }


    /* =====================================================
       ACTIVE FILTER COUNT
    ===================================================== */

    const hasActiveFilters =
        searchQuery.trim() !== "" ||
        selectedFilter !== "" ||
        selectedProperty !== "";


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <main className="favorites-wrapper">


            {/* =================================================
                PAGE HERO
            ================================================= */}

            <section className="favorites-hero">

                <div className="hero-decoration hero-dot-one"></div>

                <div className="hero-decoration hero-dot-two"></div>

                <div className="hero-pokeball"></div>


                <div className="favorites-title">

                    <span className="favorites-eyebrow">
                        POKÉDEX • COLLECTION
                    </span>

                    <h1>
                        My Favorite Pokémon
                    </h1>

                    <p>
                        Your personal collection of
                        Pokémon, ready to explore.
                    </p>

                </div>


                <div className="favorites-count-card">

                    <span className="count-number">
                        {favorites.length}
                    </span>

                    <span className="count-label">
                        FAVORITES
                    </span>

                </div>

            </section>


            {/* =================================================
                CONTROL PANEL
            ================================================= */}

            <section className="favorites-controls">


                {/* ---------- Search ---------- */}

                <div className="favorites-search">

                    <span className="search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) =>
                            setSearchQuery(
                                e.target.value
                            )
                        }
                        placeholder="Search Pokémon by name or number..."
                        aria-label="Search Pokémon"
                    />

                    {searchQuery && (

                        <button
                            className="clear-search"
                            onClick={() =>
                                setSearchQuery("")
                            }
                            aria-label="Clear search"
                        >
                            ×
                        </button>

                    )}

                </div>


                {/* ---------- Filters ---------- */}

                <div className="filter-group">


                    <div className="control-label">
                        FILTER
                    </div>


                    <div className="select-row">


                        <div className="select-wrapper">

                            <select
                                value={selectedFilter}
                                onChange={handleFilterChange}
                            >

                                <option value="">
                                    Filter by...
                                </option>

                                <option value="types">
                                    Type
                                </option>

                                <option value="moves">
                                    Move
                                </option>

                                <option value="abilities">
                                    Ability
                                </option>

                                <option value="species">
                                    Species
                                </option>

                            </select>

                        </div>


                        {selectedFilter && (

                            <div className="select-wrapper property-select">

                                <select
                                    value={selectedProperty}
                                    onChange={(e) =>
                                        setSelectedProperty(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Select{" "}
                                        {selectedFilter}
                                    </option>


                                    {filterOptions[
                                        selectedFilter
                                    ]?.map((property) => (

                                        <option
                                            key={property}
                                            value={property}
                                        >
                                            {property}
                                        </option>

                                    ))}

                                </select>

                            </div>

                        )}

                    </div>

                </div>


                {/* ---------- Sort ---------- */}

                <div className="sort-group">

                    <div className="control-label">
                        SORT BY
                    </div>


                    <div className="select-row">

                        <div className="select-wrapper">

                            <select
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="name">
                                    Name
                                </option>

                                <option value="id">
                                    Pokédex Number
                                </option>

                                <option value="hp">
                                    HP
                                </option>

                                <option value="attack">
                                    Attack
                                </option>

                                <option value="defense">
                                    Defense
                                </option>

                                <option value="special-attack">
                                    Special Attack
                                </option>

                                <option value="special-defense">
                                    Special Defense
                                </option>

                                <option value="speed">
                                    Speed
                                </option>

                            </select>

                        </div>


                        <button
                            className="sort-direction"
                            onClick={() =>
                                setSortOrder(
                                    sortOrder === "asc"
                                        ? "desc"
                                        : "asc"
                                )
                            }
                            title={
                                sortOrder === "asc"
                                    ? "Ascending"
                                    : "Descending"
                            }
                        >

                            {sortOrder === "asc"
                                ? "↑"
                                : "↓"}

                        </button>

                    </div>

                </div>


                {/* ---------- Reset ---------- */}

                <button
                    className={`reset-button ${
                        hasActiveFilters
                            ? "active"
                            : ""
                    }`}
                    onClick={resetFilters}
                >

                    <span>
                        ↻
                    </span>

                    Reset

                </button>

            </section>


            {/* =================================================
                ACTIVE FILTER BAR
            ================================================= */}

            {hasActiveFilters && (

                <div className="active-filter-bar">

                    <div className="active-filter-status">

                        <span className="status-dot"></span>

                        <span>
                            Filters active
                        </span>

                    </div>


                    {searchQuery && (

                        <span className="filter-chip">

                            Search:
                            <strong>
                                "{searchQuery}"
                            </strong>

                        </span>

                    )}


                    {selectedProperty && (

                        <span className="filter-chip">

                            {selectedFilter}:
                            <strong>
                                {selectedProperty}
                            </strong>

                        </span>

                    )}

                </div>

            )}


            {/* =================================================
                RESULTS HEADER
            ================================================= */}

            <section className="favorites-results-header">

                <div>

                    <span className="results-eyebrow">
                        YOUR COLLECTION
                    </span>

                    <h2>
                        Pokémon
                    </h2>

                </div>


                <div className="results-count">

                    <strong>
                        {appliedFavorites.length}
                    </strong>

                    <span>
                        {appliedFavorites.length === 1
                            ? "favorite"
                            : "favorites"}
                    </span>

                </div>

            </section>


            {/* =================================================
                POKEMON LIST
            ================================================= */}

            <section className="favorites-body">

                {appliedFavorites.length > 0 ? (

                    appliedFavorites.map((pokemon, index) => (

                        <div
                            key={pokemon.id}
                            className={`favorite-card-wrapper ${
                                expandedId === pokemon.id
                                    ? "expanded"
                                    : ""
                            }`}
                            style={{
                                "--card-index": index
                            }}
                        >

                            {expandedId === pokemon.id ? (

                                <DetailsCard
                                    pokemon={pokemon}
                                    onExpand={() =>
                                        setExpandedId(null)
                                    }
                                />

                            ) : (

                                <SummaryCard
                                    pokemon={pokemon}
                                    onExpand={() =>
                                        setExpandedId(
                                            pokemon.id
                                        )
                                    }
                                />

                            )}

                        </div>

                    ))

                ) : (

                    /* =================================================
                       EMPTY STATE
                    ================================================= */

                    <div className="favorites-empty">

                        <div className="empty-pokeball">

                            <div className="empty-pokeball-line"></div>

                            <div className="empty-pokeball-center"></div>

                        </div>


                        <h3>
                            No Pokémon found
                        </h3>

                        <p>
                            {favorites.length === 0
                                ? "Your favorite Pokémon will appear here."
                                : "Try changing your search or filters."
                            }
                        </p>


                        {hasActiveFilters && (

                            <button
                                className="empty-reset-button"
                                onClick={resetFilters}
                            >
                                Clear Filters
                            </button>

                        )}

                    </div>

                )}

            </section>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="favorites-footer">

                <div className="footer-decoration"></div>

                <span>

                    Showing{" "}

                    <strong>
                        {appliedFavorites.length}
                    </strong>{" "}

                    of{" "}

                    <strong>
                        {favorites.length}
                    </strong>{" "}

                    Favorites

                </span>

            </footer>


        </main>
    );
}