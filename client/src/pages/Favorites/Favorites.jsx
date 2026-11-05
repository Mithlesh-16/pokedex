
import "./Favorites.css";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites.js";
import { DetailsCard, SummaryCard } from "./DetailsCard.jsx";

function readFavorites() {
    try {
        const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
}

function getStatValue(pokemon, statName) {
    const stat = pokemon?.stats?.find(item => item?.name === statName);
    return Number(stat?.value ?? 0);
}

function getPropertyValues(pokemon, property) {
    if (property === "species") {
        const species = pokemon?.species;

        if (typeof species === "string") return [species];

        return species?.name ? [species.name] : [];
    }

    const values = pokemon?.[property] || [];

    return values.map(item => {
        if (typeof item === "string") return item;

        if (property === "types") {
            return item?.type?.name || item?.name;
        }

        if (property === "abilities") {
            return item?.ability?.name || item?.name;
        }

        if (property === "moves") {
            return item?.move?.name || item?.name;
        }

        return null;
    }).filter(Boolean);
}

export default function Favorites() {
    const { toggleFavorite } = useFavorites();

    const [favorites, setFavorites] = useState(readFavorites);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [selectedProperty, setSelectedProperty] = useState("");

    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    const [expandedId, setExpandedId] = useState(null);

    // Generate available filter values dynamically.
    const filterOptions = useMemo(() => {
        const options = {
            types: new Set(),
            abilities: new Set(),
            species: new Set(),
            moves: new Set()
        };

        favorites.forEach(pokemon => {
            Object.keys(options).forEach(property => {
                getPropertyValues(pokemon, property).forEach(value => {
                    options[property].add(value);
                });
            });
        });

        return Object.fromEntries(
            Object.entries(options).map(([key, values]) => [
                key,
                [...values].sort()
            ])
        );
    }, [favorites]);

    // Search, filter and sort.
    const appliedFavorites = useMemo(() => {
        let result = [...favorites];

        if (searchQuery.trim()) {
            const query = searchQuery.trim().toLowerCase();

            result = result.filter(pokemon =>
                pokemon?.name?.toLowerCase().includes(query) ||
                String(pokemon?.id ?? "").includes(query)
            );
        }

        if (selectedFilter && selectedProperty) {
            result = result.filter(pokemon =>
                getPropertyValues(pokemon, selectedFilter)
                    .includes(selectedProperty)
            );
        }

        result.sort((a, b) => {
            if (sortBy === "name") {
                const nameA = a?.name || "";
                const nameB = b?.name || "";

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

    // Remove a Pokémon from favorites.
    function handleRemove(pokemon) {
        toggleFavorite(pokemon);

        setFavorites(previous =>
            previous.filter(item => item.id !== pokemon.id)
        );

        if (expandedId === pokemon.id) {
            setExpandedId(null);
        }
    }

    function resetFilters() {
        setSearchQuery("");
        setSelectedFilter("");
        setSelectedProperty("");
        setSortBy("id");
        setSortOrder("asc");
        setExpandedId(null);
    }

    const hasActiveFilters =
        searchQuery.trim() !== "" ||
        selectedFilter !== "" ||
        selectedProperty !== "";

    return (
        <main className="favorites-page">

            {/* HEADER */}
            <header className="favorites-header">
                <div className="favorites-heading">
                    <span className="favorites-eyebrow">
                        POKÉDEX / COLLECTION
                    </span>

                    <h1>
                        My Favorites
                        <span>{favorites.length}</span>
                    </h1>
                </div>

                <Link to="/" className="favorites-home-link">
                    ← Back to Pokédex
                </Link>
            </header>

            {/* TOOLBAR */}
            <section className="favorites-toolbar">

                <div className="favorites-search">
                    <span>⌕</span>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search by name or number..."
                        aria-label="Search favorites"
                    />

                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                <div className="favorites-select-group">

                    <select
                        value={selectedFilter}
                        onChange={e => {
                            setSelectedFilter(e.target.value);
                            setSelectedProperty("");
                        }}
                        aria-label="Filter category"
                    >
                        <option value="">All categories</option>
                        <option value="types">Type</option>
                        <option value="abilities">Ability</option>
                        <option value="species">Species</option>
                        <option value="moves">Move</option>
                    </select>

                    {selectedFilter && (
                        <select
                            value={selectedProperty}
                            onChange={e => setSelectedProperty(e.target.value)}
                            aria-label="Filter value"
                        >
                            <option value="">All values</option>

                            {filterOptions[selectedFilter]?.map(value => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    )}

                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        aria-label="Sort favorites"
                    >
                        <option value="id">Pokédex Number</option>
                        <option value="name">Name</option>
                        <option value="hp">HP</option>
                        <option value="attack">Attack</option>
                        <option value="defense">Defense</option>
                        <option value="special-attack">Special Attack</option>
                        <option value="special-defense">Special Defense</option>
                        <option value="speed">Speed</option>
                    </select>

                    <button
                        type="button"
                        className="sort-direction"
                        onClick={() =>
                            setSortOrder(previous =>
                                previous === "asc" ? "desc" : "asc"
                            )
                        }
                        title={sortOrder === "asc" ? "Ascending" : "Descending"}
                        aria-label="Change sort direction"
                    >
                        {sortOrder === "asc" ? "↑" : "↓"}
                    </button>
                </div>

                {hasActiveFilters && (
                    <button
                        type="button"
                        className="reset-filters"
                        onClick={resetFilters}
                    >
                        Reset
                    </button>
                )}
            </section>

            {/* RESULTS INFORMATION */}
            <div className="favorites-results-info">
                <span>
                    <strong>{appliedFavorites.length}</strong> Pokémon found
                </span>

                <span>
                    {expandedId !== null
                        ? "One Pokémon expanded"
                        : "Select a card to view details"}
                </span>
            </div>

            {/* POKEMON GRID */}
            <section className="favorites-grid">

                {appliedFavorites.length > 0 ? (
                    appliedFavorites.map(pokemon => (
                        <div
                            key={pokemon.id}
                            className={`favorite-card-wrapper ${
                                expandedId === pokemon.id ? "expanded" : ""
                            }`}
                        >
                            {expandedId === pokemon.id ? (
                                <DetailsCard
                                    pokemon={pokemon}
                                    onExpand={() => setExpandedId(null)}
                                    onRemove={() => handleRemove(pokemon)}
                                />
                            ) : (
                                <SummaryCard
                                    pokemon={pokemon}
                                    onExpand={() => setExpandedId(pokemon.id)}
                                    onRemove={() => handleRemove(pokemon)}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="favorites-empty">
                        <span>♡</span>

                        <h2>
                            {favorites.length === 0
                                ? "No favorites yet"
                                : "No Pokémon found"}
                        </h2>

                        <p>
                            {favorites.length === 0
                                ? "Add Pokémon to your favorites to build your collection."
                                : "Try changing your search or filters."}
                        </p>

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={resetFilters}
                            >
                                Clear filters
                            </button>
                        )}

                        {favorites.length === 0 && (
                            <Link to="/">
                                Explore Pokémon
                            </Link>
                        )}
                    </div>
                )}

            </section>

        </main>
    );
}
