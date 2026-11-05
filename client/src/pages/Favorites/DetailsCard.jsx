
import { FaHeart } from "react-icons/fa";
import "./DetailsCard.css";

function formatName(name = "") {
    return name
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function getPokemonTypes(pokemon) {
    if (!Array.isArray(pokemon?.types)) return [];

    return pokemon.types
        .map(type => {
            if (typeof type === "string") return type;
            return type?.type?.name || type?.name;
        })
        .filter(Boolean);
}

function getStat(pokemon, name) {
    return Number(
        pokemon?.stats?.find(stat => stat?.name === name)?.value ?? 0
    );
}

function TypeBadges({ types }) {
    return (
        <div className="favorite-type-list">
            {types.map(type => (
                <span
                    key={type}
                    className={`favorite-type type-${type}`}
                >
                    {type}
                </span>
            ))}
        </div>
    );
}

/* ============================================
   SUMMARY CARD
   ============================================ */

function SummaryCard({ pokemon, onExpand, onRemove }) {
    const types = getPokemonTypes(pokemon);
    const primaryType = types[0] || "normal";

    const stats = [
        { label: "HP", value: getStat(pokemon, "hp") },
        { label: "ATK", value: getStat(pokemon, "attack") },
        { label: "DEF", value: getStat(pokemon, "defense") },
        { label: "SPD", value: getStat(pokemon, "speed") }
    ];

    return (
        <article
            className="summary-card"
            data-type={primaryType}
            onClick={onExpand}
            onKeyDown={event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onExpand();
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View ${formatName(pokemon?.name)} details`}
        >
            <div className="summary-card-top">
                <span className="pokemon-number">
                    #{String(pokemon?.id ?? 0).padStart(3, "0")}
                </span>

                <button
                    type="button"
                    className="favorite-remove-button"
                    onClick={event => {
                        event.stopPropagation();
                        onRemove();
                    }}
                    aria-label={`Remove ${pokemon?.name} from favorites`}
                    title="Remove from favorites"
                >
                    <FaHeart />
                </button>
            </div>

            <div className="summary-card-main">
                <div className="summary-card-image">
                    {pokemon?.image && (
                        <img
                            src={pokemon.image}
                            alt={pokemon?.name}
                            loading="lazy"
                        />
                    )}
                </div>

                <div className="summary-card-information">
                    <h3>{formatName(pokemon?.name)}</h3>

                    <TypeBadges types={types} />

                    <div className="summary-stats">
                        {stats.map(stat => (
                            <div key={stat.label}>
                                <span>{stat.label}</span>
                                <strong>{stat.value}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="summary-card-action">
                View details <span>↗</span>
            </div>
        </article>
    );
}

/* ============================================
   EXPANDED DETAILS CARD
   ============================================ */

function DetailsCard({ pokemon, onExpand, onRemove }) {
    const types = getPokemonTypes(pokemon);
    const primaryType = types[0] || "normal";

    const stats = [
        { label: "HP", name: "hp" },
        { label: "Attack", name: "attack" },
        { label: "Defense", name: "defense" },
        { label: "Special Attack", name: "special-attack" },
        { label: "Special Defense", name: "special-defense" },
        { label: "Speed", name: "speed" }
    ];

    const totalStats = stats.reduce(
        (total, stat) => total + getStat(pokemon, stat.name),
        0
    );

    return (
        <article className="details-card" data-type={primaryType}>

            <header className="details-card-header">
                <div>
                    <span className="pokemon-number">
                        #{String(pokemon?.id ?? 0).padStart(3, "0")}
                    </span>

                    <h3>{formatName(pokemon?.name)}</h3>
                </div>

                <div className="details-card-actions">
                    <button
                        type="button"
                        className="favorite-remove-button"
                        onClick={onRemove}
                        title="Remove from favorites"
                        aria-label="Remove from favorites"
                    >
                        <FaHeart />
                    </button>

                    <button
                        type="button"
                        className="details-close-button"
                        onClick={onExpand}
                        aria-label="Collapse details"
                    >
                        ×
                    </button>
                </div>
            </header>

            <div className="details-card-body">

                <div className="details-card-image">
                    {pokemon?.image && (
                        <img
                            src={pokemon.image}
                            alt={pokemon?.name}
                        />
                    )}
                </div>

                <div className="details-card-information">

                    <TypeBadges types={types} />

                    <div className="details-attributes">
                        <div>
                            <span>Height</span>
                            <strong>
                                {Number(pokemon?.height ?? 0) / 10} m
                            </strong>
                        </div>

                        <div>
                            <span>Weight</span>
                            <strong>
                                {Number(pokemon?.weight ?? 0) / 10} kg
                            </strong>
                        </div>

                        <div>
                            <span>Species</span>
                            <strong>
                                {formatName(
                                    typeof pokemon?.species === "string"
                                        ? pokemon.species
                                        : pokemon?.species?.name || "Unknown"
                                )}
                            </strong>
                        </div>
                    </div>

                    <div className="details-stats-heading">
                        <strong>Base Stats</strong>
                        <span>Total: {totalStats}</span>
                    </div>

                    <div className="details-stats-grid">
                        {stats.map(stat => (
                            <div
                                className="details-stat-item"
                                key={stat.name}
                            >
                                <span>{stat.label}</span>
                                <strong>
                                    {getStat(pokemon, stat.name)}
                                </strong>
                            </div>
                        ))}
                    </div>

                    {pokemon?.abilities?.length > 0 && (
                        <div className="details-abilities">
                            <span>Abilities</span>

                            <div>
                                {pokemon.abilities.map(ability => {
                                    const name = typeof ability === "string"
                                        ? ability
                                        : ability?.name || ability?.ability?.name;

                                    return name ? (
                                        <span key={name}>
                                            {formatName(name)}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </article>
    );
}

export {
    SummaryCard,
    DetailsCard
};
