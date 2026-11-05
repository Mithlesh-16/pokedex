import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { useFavorites } from "../../hooks/useFavorites.js";
import EvolutionTree from "../../components/Evolution/EvolutionTree.jsx";
import PokemonTypes from "../../components/Type/PokemonTypes.jsx";
import PokemonSimilarTypes from "../../components/Type/PokemonSimilarTypes.jsx";

import "./PokemonInfo.css";

function formatName(name = "") {
    return name.split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function PokemonStatsChart({ stats = [] }) {
    const maxStat = Math.max(...stats.map(stat => stat.value), 1);

    return (
        <div className="stats-chart">
            <div className="stats-chart-axis">
                <span>{maxStat}</span>
                <span>{Math.round(maxStat / 2)}</span>
                <span>0</span>
            </div>

            <div className="stats-chart-bars">
                {stats.map(stat => (
                    <div className="stats-chart-item" key={stat.name}>
                        <div className="stats-chart-value">
                            {stat.value}
                        </div>

                        <div className="stats-chart-track">
                            <div
                                className="stats-chart-fill"
                                style={{
                                    height: `${stat.value / maxStat * 100}%`
                                }}
                            />
                        </div>

                        <span className="stats-chart-label">
                            {formatName(stat.name)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PokemonInfo({ pokemon }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(pokemon?.id);
    const id = Number(pokemon?.id);

    return (
        <main className={`pokemon-detail-page pokemon-type-theme-${pokemon?.types?.[0] || "normal"}`}>
            {/* Page heading */}
            <header className="detail-page-header">
                <div className="detail-title-group">
                    <Link to="/" className="detail-back-button">
                        ←
                    </Link>

                    <h1>
                        {formatName(pokemon?.name)}
                        <span>#{String(id).padStart(3, "0")}</span>
                    </h1>
                </div>

                <div className="detail-header-actions">
                    <Link to="/favorites" className="detail-navigation-button">
                        <FaHeart/>favorites
                    </Link>
                    <button
                        type="button"
                        className={`detail-favorite-button ${favorite ? "active" : ""}`}
                        onClick={() => toggleFavorite(pokemon)}
                        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {favorite ? <FaHeart /> : <FaRegHeart />}
                    </button>

                    <Link
                        to={`/pokemon/${id - 1}`}
                        className="detail-navigation-button"
                        aria-label="Previous Pokémon"
                        onClick={event => {
                            if (id <= 1) event.preventDefault();
                        }}
                        style={{ opacity: id <= 1 ? 0.4 : 1 }}
                    >
                        Prev
                    </Link>

                    <Link
                        to={`/pokemon/${id + 1}`}
                        className="detail-navigation-button"
                    >
                        Next
                    </Link>
                </div>
            </header>

            {/* Main information card */}
            <section className="pokemon-detail-card">

                {/* Left: Artwork */}
                <div className="detail-artwork-panel">
                    <div className="detail-artwork-background">
                        <img
                            src={pokemon?.image}
                            alt={pokemon?.name}
                            className="detail-pokemon-image"
                        />
                    </div>
                </div>

                {/* Right: Information */}
                <div className="detail-information-panel">

                    {/* Description */}
                    <section className="detail-description">
                        <h2>Description</h2>

                        <p>
                            {pokemon?.description ||
                                "Pokédex description is not available."}
                        </p>
                    </section>

                    {/* Attributes */}
                    <section className="detail-attributes">
                        <h2>Attributes</h2>

                        <div className="attributes-content">
                            <div className="attribute-values">
                                <p>
                                    <strong>Height:</strong>
                                    {(pokemon?.height / 10).toFixed(1)} m
                                </p>

                                <p>
                                    <strong>Weight:</strong>
                                    {(pokemon?.weight / 10).toFixed(1)} kg
                                </p>

                                <p>
                                    <strong>Species:</strong>
                                    {formatName(pokemon?.species)}
                                </p>
                            </div>

                            <div className="attribute-types">
                                {pokemon?.types?.map(type => (
                                    <span className={`attribute-type ${type}`} key={type}>
                                        {formatName(type)}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="attribute-abilities">
                            <span>Abilities</span>
                            <div>
                                {pokemon?.abilities?.map(ability => (
                                    <span key={ability.name}>
                                        {formatName(ability.name)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Base stats */}
                    <section className="detail-stats">
                        <div className="detail-section-heading">
                            <h2>Stats</h2>
                            <span>
                                Total: {pokemon?.stats?.reduce(
                                    (sum, stat) => sum + stat.value, 0
                                )}
                            </span>
                        </div>

                        <PokemonStatsChart stats={pokemon?.stats || []} />
                    </section>
                </div>
            </section>

            {/* Evolution */}
            <section className="detail-lower-section">
                <div className="detail-section-heading">
                    <h2>Evolutions</h2>
                </div>

                <EvolutionTree pokemon={pokemon} />
            </section>

            {/* Type effectiveness */}
            <section className="detail-lower-section">
                <div className="detail-section-heading">
                    <h2>Type Effectiveness</h2>
                </div>

                <PokemonTypes types={pokemon?.types} />
            </section>

            {/* Moves */}
            <section className="detail-lower-section">
                <div className="detail-section-heading">
                    <h2>Moves</h2>
                    <span>{pokemon?.moves?.length || 0} moves</span>
                </div>

                <div className="detail-moves-list">
                    {pokemon?.moves?.slice(0, 24).map(move => (
                        <span key={move.name}>
                            {formatName(move.name)}
                        </span>
                    ))}
                </div>

                {pokemon?.moves?.length > 24 && (
                    <p className="detail-moves-note">
                        Showing first 24 moves
                    </p>
                )}
            </section>

            {/* Similar Pokémon */}
            <section className="detail-lower-section">
                <div className="detail-section-heading">
                    <h2>Similar Pokémon</h2>
                </div>

                <PokemonSimilarTypes
                    types={pokemon?.types}
                    currentPokemonName={pokemon?.name}
                />
            </section>

        </main>
    );
}

export default PokemonInfo;
