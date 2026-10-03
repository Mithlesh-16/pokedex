import './DetailsCard.css';


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getTypeName(type) {
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
}


function getPokemonTypes(pokemon) {
    if (!Array.isArray(pokemon?.types)) {
        return [];
    }

    return pokemon.types
        .map(getTypeName)
        .filter(Boolean);
}


/* =========================================================
   DETAILS CARD
   ========================================================= */

function DetailsCard({ pokemon, onExpand }) {

    const types = getPokemonTypes(pokemon);

    const primaryType = types[0] || "normal";


    return (
        <div
            className="details-card"
            data-type={primaryType}
            onClick={onExpand}
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="details-card-header">

                <h3>
                    <span className="card-arrow">
                        ▼
                    </span>

                    {pokemon?.name || "Unknown Pokémon"}
                </h3>


                <span className="pokemon-number">
                    #{String(pokemon?.id ?? 0).padStart(3, "0")}
                </span>

            </div>


            {/* =================================================
                BODY
            ================================================= */}

            <div className="details-card-body">


                {/* =================================================
                    POKEMON IMAGE
                ================================================= */}

                <div className="details-card-image">

                    <div className="image-glow"></div>

                    <div className="image-ring"></div>


                    {pokemon?.image && (
                        <img
                            src={pokemon.image}
                            alt={pokemon?.name || "Pokémon"}
                        />
                    )}

                </div>


                {/* =================================================
                    POKEMON INFORMATION
                ================================================= */}

                <div className="details-card-info">


                    {/* Pokemon Name */}

                    <div className="pokemon-name">
                        {pokemon?.name || "Unknown Pokémon"}
                    </div>


                    {/* =================================================
                        TYPES
                    ================================================= */}

                    {types.length > 0 && (

                        <div className="pokemon-types">

                            {types.map((typeName, index) => (

                                <span
                                    key={`${typeName}-${index}`}
                                    className={`type-badge type-${typeName}`}
                                >
                                    {typeName}
                                </span>

                            ))}

                        </div>

                    )}


                    {/* =================================================
                        STATS
                    ================================================= */}

                    {Array.isArray(pokemon?.stats) &&
                        pokemon.stats.length > 0 && (

                            <div className="pokemon-stats">


                                {/* HP */}

                                <div className="stat-item">

                                    <span className="stat-label">
                                        HP
                                    </span>

                                    <span className="stat-value">
                                        {pokemon.stats[0]?.base_stat ?? "--"}
                                    </span>

                                </div>


                                {/* ATTACK */}

                                <div className="stat-item">

                                    <span className="stat-label">
                                        ATK
                                    </span>

                                    <span className="stat-value">
                                        {pokemon.stats[1]?.base_stat ?? "--"}
                                    </span>

                                </div>


                                {/* DEFENSE */}

                                <div className="stat-item">

                                    <span className="stat-label">
                                        DEF
                                    </span>

                                    <span className="stat-value">
                                        {pokemon.stats[2]?.base_stat ?? "--"}
                                    </span>

                                </div>


                                {/* SPEED */}

                                <div className="stat-item">

                                    <span className="stat-label">
                                        SPD
                                    </span>

                                    <span className="stat-value">
                                        {pokemon.stats[5]?.base_stat ?? "--"}
                                    </span>

                                </div>


                            </div>

                        )}

                </div>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="details-card-footer">

                <span className="footer-line"></span>

                <span className="footer-text">
                    POKÉDEX DATA
                </span>

                <span className="footer-line"></span>

            </div>

        </div>
    );
}



/* =========================================================
   SUMMARY CARD
   ========================================================= */

function SummaryCard({ pokemon, onExpand }) {

    const types = getPokemonTypes(pokemon);

    const primaryType = types[0] || "normal";


    return (
        <div
            className="summary-card"
            data-type={primaryType}
            onClick={onExpand}
        >

            <div className="summary-card-header">


                {/* =================================================
                    NAME
                ================================================= */}

                <h3>

                    <span className="card-arrow">
                        ▶
                    </span>

                    {pokemon?.name || "Unknown Pokémon"}

                </h3>


                {/* =================================================
                    NUMBER
                ================================================= */}

                <span className="pokemon-number">

                    #{String(
                        pokemon?.id ?? 0
                    ).padStart(3, "0")}

                </span>


            </div>


            {/* =================================================
                TYPE INDICATORS
            ================================================= */}

            {types.length > 0 && (

                <div className="summary-card-types">

                    {types.map((typeName, index) => (

                        <span
                            key={`${typeName}-${index}`}
                            className={`type-dot type-${typeName}`}
                            title={typeName}
                        ></span>

                    ))}

                </div>

            )}

        </div>
    );
}


export {
    DetailsCard,
    SummaryCard
};