import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import PokemonInfo from "../../pages/PokemonDetails/PokemonInfo.jsx";

import useTypeEffectiveness from "../../hooks/useTypeEffectiveness.jsx";
import "./PokemonSimilarTypes.css";

function TypeDataLoader({ typeName, onTypeData }) {
    const { typeData, loading, error } = useTypeEffectiveness(typeName);

    useEffect(() => {
        onTypeData(typeName, {
            data: typeData,
            loading,
            error
        });
    }, [typeName, typeData, loading, error, onTypeData]);

    return null;
}

export default function PokemonSimilarTypes({
    types = [],
    currentPokemonName
}) {
    const [typeResults, setTypeResults] = useState({});

    const typeNames = useMemo(() => [
        ...new Set(
            types
                .map(item =>
                    typeof item === "string"
                        ? item
                        : item?.type?.name
                )
                .filter(Boolean)
        )
    ], [types]);

    const handleTypeData = useCallback((typeName, result) => {
        setTypeResults(previous => {
            const current = previous[typeName];

            if (
                current?.data === result.data &&
                current?.loading === result.loading &&
                current?.error === result.error
            ) {
                return previous;
            }

            return {
                ...previous,
                [typeName]: result
            };
        });
    }, []);

    function getPokemonId(url) {
        const parts = url.split("/").filter(Boolean);
        return parts[parts.length - 1];
    }

    const isLoading = typeNames.some(type =>
        typeResults[type]?.loading ||
        (!typeResults[type]?.data && !typeResults[type]?.error)
    );

    const hasError = typeNames.some(type =>
        typeResults[type]?.error
    );

    const allDataLoaded = typeNames.length > 0 &&
        typeNames.every(type => typeResults[type]?.data);

    const similarPokemon = useMemo(() => {
        const similarMap = new Map();

        for (const typeName of typeNames) {
            const typeData = typeResults[typeName]?.data;
            if (!typeData) continue;

            for (const entry of typeData.pokemon ?? []) {
                const { name, url } = entry.pokemon;
                const id = Number(getPokemonId(url));

                const previous = similarMap.get(name);

                similarMap.set(name, {
                    id,
                    count: (previous?.count ?? 0) + 1
                });
            }
        }

        return [...similarMap.entries()]
            .filter(([name]) => name !== currentPokemonName)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 10);
    }, [typeNames, typeResults, currentPokemonName]);

    if (typeNames.length === 0) return null;

    return (
        <>
            {typeNames.map(typeName => (
                <TypeDataLoader
                    key={typeName}
                    typeName={typeName}
                    onTypeData={handleTypeData}
                />
            ))}

            <div className="similar-types-container">

                {isLoading && (
                    <p>Loading similar Pokémon...</p>
                )}

                {!isLoading && hasError && (
                    <p>Some Pokémon type data could not be loaded.</p>
                )}

                {allDataLoaded && similarPokemon.length > 0 && (
                    <div className="similar-types-list">
                        {similarPokemon.map(([name, { id, count }]) => (
                            <Link
                                to={`/pokemon/${id}`}
                                key={name}
                                className="similar-types-item"
                                title={`${count} matching types`}
                            >
                                
                                <div className="similar-types-details">
                                    <span className="similar-types-name">
                                        {name}
                                    </span>
                                    <span className="similar-types-count">
                                        {count}
                                    </span>
                                </div>

                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                                    alt={name}
                                    loading="lazy"
                                />
                            </Link>
                        ))}
                    </div>
                )}

                {allDataLoaded && similarPokemon.length === 0 && (
                    <p className="similar-types-empty">
                        No similar Pokémon found.
                    </p>
                )}

            </div>
        </>
    );
}
