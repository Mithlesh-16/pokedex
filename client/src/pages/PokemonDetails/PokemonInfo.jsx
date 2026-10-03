import "./PokemonInfo.css";
import { useFavorites } from "../../hooks/useFavorites.js";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function PokemonInfo({ pokemon }) {

    const { isFavorite, toggleFavorite } = useFavorites();

    const favorite = isFavorite(pokemon?.id);

    const primaryType = pokemon?.types?.[0] || "normal";


    function formatName(name) {
        if (!name) return "";

        return name
            .split("-")
            .map(
                word =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
            )
            .join(" ");
    }


    return (
        <main
            className={`pokemon-info pokemon-type-theme-${primaryType}`}
        >

            {/* =========================================
                TOP HERO CARD
            ========================================= */}

            <section className="pokemon-hero-card">

                {/* Decorative background elements */}

                <div className="pokemon-hero-glow"></div>

                <div className="pokemon-hero-ring"></div>


                {/* =====================================
                    HERO IMAGE
                ===================================== */}

                <div className="pokemon-info-image-wrapper">

                    <div className="pokemon-image-backdrop"></div>

                    <div className="pokemon-image-ring"></div>


                    <span className="pokemon-info-number">
                        #{String(pokemon?.id).padStart(3, "0")}
                    </span>


                    <img
                        className="pokemon-info-image"
                        src={pokemon?.image}
                        alt={pokemon?.name}
                    />

                </div>


                {/* =====================================
                    POKEMON DETAILS
                ===================================== */}

                <div className="pokemon-info-title">

                    <span className="pokemon-info-label">
                        Pokémon Details
                    </span>


                    <div className="pokemon-info-name-wrapper">

                        <h1 className="pokemon-info-name">
                            {formatName(pokemon?.name)}
                        </h1>


                        <button
                            className={`favorite-button ${
                                favorite
                                    ? "favorite-active"
                                    : ""
                            }`}
                            onClick={() =>
                                toggleFavorite(pokemon)
                            }
                            aria-label={
                                favorite
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                            }
                        >

                            {favorite ? (
                                <FaHeart className="heart-filled" />
                            ) : (
                                <FaRegHeart className="heart-empty" />
                            )}

                        </button>

                    </div>


                    {/* Pokemon Types */}

                    <div className="pokemon-info-types">

                        {pokemon?.types?.map(type => (

                            <span
                                key={type}
                                className={`pokemon-type ${type}`}
                            >
                                <span className="type-dot"></span>
                                {formatName(type)}
                            </span>

                        ))}

                    </div>


                    {/* Quick information */}

                    <div className="pokemon-quick-info">

                        <div className="quick-info-item">

                            <span>Species</span>

                            <strong>
                                {formatName(pokemon?.species)}
                            </strong>

                        </div>


                        <div className="quick-info-divider"></div>


                        <div className="quick-info-item">

                            <span>Height</span>

                            <strong>
                                {(pokemon?.height / 10).toFixed(1)} m
                            </strong>

                        </div>


                        <div className="quick-info-divider"></div>


                        <div className="quick-info-item">

                            <span>Weight</span>

                            <strong>
                                {(pokemon?.weight / 10).toFixed(1)} kg
                            </strong>

                        </div>

                    </div>


                    {/* =================================
                        FAVORITES NAVIGATION
                    ================================= */}

                    <div className="pokemon-hero-actions">

                        <Link
                            to="/favorites"
                            className="favorites-page-button"
                        >
                            <FaHeart />

                            <span>
                                Go to Favorites
                            </span>

                            <span className="action-arrow">
                                →
                            </span>

                        </Link>


                        <Link
                            to="/"
                            className="back-pokedex-button"
                        >
                            ← Back to Pokédex
                        </Link>

                    </div>

                </div>

            </section>



            {/* =========================================
                MAIN CONTENT
            ========================================= */}

            <div className="pokemon-info-content">


                {/* =====================================
                    BASIC INFORMATION
                ===================================== */}

                <section className="pokemon-info-section">

                    <div className="section-heading">

                        <div>

                            <span className="section-label">
                                Overview
                            </span>

                            <h2>
                                Basic Information
                            </h2>

                        </div>

                    </div>


                    <div className="pokemon-basic-info">


                        <div className="pokemon-info-box">

                            <span>
                                Height
                            </span>

                            <strong>
                                {(pokemon?.height / 10).toFixed(1)}
                                <small> m</small>
                            </strong>

                        </div>


                        <div className="pokemon-info-box">

                            <span>
                                Weight
                            </span>

                            <strong>
                                {(pokemon?.weight / 10).toFixed(1)}
                                <small> kg</small>
                            </strong>

                        </div>


                        <div className="pokemon-info-box">

                            <span>
                                Species
                            </span>

                            <strong className="species-value">
                                {formatName(pokemon?.species)}
                            </strong>

                        </div>

                    </div>

                </section>



                {/* =====================================
                    ABILITIES
                ===================================== */}

                <section className="pokemon-info-section">

                    <div className="section-heading">

                        <div>

                            <span className="section-label">
                                Traits
                            </span>

                            <h2>
                                Abilities
                            </h2>

                        </div>

                    </div>


                    <div className="pokemon-badges">

                        {pokemon?.abilities?.map(ability => (

                            <span
                                key={ability}
                                className="pokemon-ability"
                            >

                                <span className="ability-dot"></span>

                                {formatName(ability)}

                            </span>

                        ))}

                    </div>

                </section>



                {/* =====================================
                    BASE STATS
                ===================================== */}

                <section className="pokemon-info-section">

                    <div className="section-heading">

                        <div>

                            <span className="section-label">
                                Performance
                            </span>

                            <h2>
                                Base Stats
                            </h2>

                        </div>

                    </div>


                    <div className="pokemon-stats">

                        {pokemon?.stats?.map(stat => (

                            <div
                                className="pokemon-stat"
                                key={stat.name}
                            >

                                <div className="pokemon-stat-header">

                                    <span className="pokemon-stat-name">
                                        {formatName(stat.name)}
                                    </span>

                                    <span className="pokemon-stat-value">
                                        {stat.value}
                                    </span>

                                </div>


                                <div className="pokemon-stat-bar">

                                    <div
                                        className="pokemon-stat-fill"
                                        style={{
                                            width: `${Math.min(
                                                (stat.value / 255) * 100,
                                                100
                                            )}%`
                                        }}
                                    />

                                </div>

                            </div>

                        ))}

                    </div>

                </section>



                {/* =====================================
                    MOVES
                ===================================== */}

                <section className="pokemon-info-section">

                    <div className="pokemon-moves-heading">

                        <div>

                            <span className="section-label">
                                Battle
                            </span>

                            <h2>
                                Moves
                            </h2>

                        </div>


                        <span className="pokemon-moves-count">
                            {pokemon?.moves?.length || 0} moves
                        </span>

                    </div>


                    <div className="pokemon-moves">

                        {pokemon?.moves
                            ?.slice(0, 24)
                            .map(move => (

                                <span
                                    key={move}
                                    className="pokemon-move"
                                >
                                    {formatName(move)}
                                </span>

                            ))}

                    </div>


                    {pokemon?.moves?.length > 24 && (

                        <p className="pokemon-moves-note">
                            Showing first 24 moves
                        </p>

                    )}

                </section>

            </div>

        </main>
    );
}

export default PokemonInfo;