import "./PokemonInfo.css";
import { addToFavorites } from "../Favorites/Favorites.jsx";

function PokemonInfo({ pokemon }) {

    function formatName(name) {
        if (!name) return "";

        return name
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    return (
        <div className="pokemon-info">

            {/* ================= HEADER ================= */}

            <div className="pokemon-info-header">

                <div className="pokemon-info-image-wrapper">

                    <span className="pokemon-info-number">
                        {String(pokemon?.id).padStart(3,"0")}
                    </span>

                    <img
                        className="pokemon-info-image"
                        src={pokemon?.image}
                        alt={pokemon?.name}
                    />

                </div>

                <div className="pokemon-info-title">

                    <span className="pokemon-info-label">
                        Pokémon Details
                    </span>

                    
                    <div className="pokemon-info-name-wrapper">
                        <h1 className="pokemon-info-name">
                        {formatName(pokemon?.name)}
                        </h1>
                        <span className="add-to-favorites" onClick={() => addToFavorites(pokemon)}>❤️</span>
                    </div>
                    

                    <div className="pokemon-info-types">
                        {pokemon?.types.map(type => (
                            <span
                                key={type}
                                className={`pokemon-type ${type}`}
                            >
                                {formatName(type)}
                            </span>
                        ))}
                    </div>

                </div>

            </div>


            {/* ================= BASIC INFO ================= */}

            <section className="pokemon-info-section">

                <h2>Basic Information</h2>

                <div className="pokemon-basic-info">

                    <div className="pokemon-info-box">
                        <span>Height</span>
                        <strong>
                            {(pokemon?.height / 10).toFixed(1)} m
                        </strong>
                    </div>

                    <div className="pokemon-info-box">
                        <span>Weight</span>
                        <strong>
                            {(pokemon?.weight / 10).toFixed(1)} kg
                        </strong>
                    </div>

                    <div className="pokemon-info-box">
                        <span>Species</span>
                        <strong>
                            {formatName(pokemon?.species)}
                        </strong>
                    </div>

                </div>

            </section>


            {/* ================= ABILITIES ================= */}

            <section className="pokemon-info-section">

                <h2>Abilities</h2>

                <div className="pokemon-badges">

                    {pokemon?.abilities.map(ability => (
                        <span
                            key={ability}
                            className="pokemon-ability"
                        >
                            {formatName(ability)}
                        </span>
                    ))}

                </div>

            </section>


            {/* ================= STATS ================= */}

            <section className="pokemon-info-section">

                <h2>Base Stats</h2>

                <div className="pokemon-stats">

                    {pokemon?.stats.map(stat => (

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


            {/* ================= MOVES ================= */}

            <section className="pokemon-info-section">

                <div className="pokemon-moves-heading">

                    <h2>Moves</h2>

                    <span className="pokemon-moves-count">
                        {pokemon?.moves.length} moves
                    </span>

                </div>

                <div className="pokemon-moves">

                    {pokemon?.moves.slice(0, 24).map(move => (
                        <span
                            key={move}
                            className="pokemon-move"
                        >
                            {formatName(move)}
                        </span>
                    ))}

                </div>

                {pokemon?.moves.length > 24 && (
                    <p className="pokemon-moves-note">
                        Showing first 24 moves
                    </p>
                )}

            </section>

        </div>
    );
}

export default PokemonInfo;