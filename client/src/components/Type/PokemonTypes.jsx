import { useCallback, useEffect, useMemo, useState } from "react";
import useTypeEffectiveness from '../../hooks/useTypeEffectiveness.jsx';
import './PokemonTypes.css';

function TypeDataLoader({ typeName, onTypeData }) {
    const { typeData, loading, error } = useTypeEffectiveness(typeName);

    useEffect(() => {
        onTypeData(typeName, {
            data: typeData,
            loading,
            error,
        });
    }, [typeName, typeData, loading, error, onTypeData]);

    return null;
}

function EffectivenessGroup({ title, types, className }) {
    return (
        <div className="effectiveness-group">
            <span className="effectiveness-label">{title}</span>

            {types.length > 0 ? (
                <div className="effectiveness-list">
                    {types.map(({ name, multiplier }) => (
                        <span
                            className={`effectiveness-chip ${className}`}
                            key={name}
                            title={`${multiplier}× damage`}
                        >
                            {name}
                            <span className="effectiveness-multiplier">
                                {multiplier}×
                            </span>
                        </span>
                    ))}
                </div>
            ) : (
                <p className="effectiveness-empty">None</p>
            )}
        </div>
    );
}

export default function PokemonTypes({ types = [], mode = "all" }) {
    const [typeResults, setTypeResults] = useState({});

    const typeNames = useMemo(
        () => [
            ...new Set(
                types
                    .map((item) =>
                        typeof item === 'string' ? item : item?.type?.name
                    )
                    .filter(Boolean)
            ),
        ],
        [types]
    );

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

            return { ...previous, [typeName]: result };
        });
    }, []);
    console.log('typeResults', typeResults);
    const isLoading = typeNames.some(
        (name) => typeResults[name]?.loading ||
            (!typeResults[name]?.data && !typeResults[name]?.error)
    );

    const hasError = typeNames.some(
        (name) => typeResults[name]?.error
    );

    const allDataLoaded = typeNames.length > 0 &&
        typeNames.every((name) => typeResults[name]?.data);

    const effectiveness = useMemo(() => {
        if (!allDataLoaded) return null;

        const multipliers = new Map();

        // Every type starts with neutral damage (1×).
        for (const resultType of typeNames) {
            const relations =
                typeResults[resultType].data.damage_relations;

            for (const [relation, multiplier] of [
                ['double_damage_from', 2],
                ['half_damage_from', 0.5],
                ['no_damage_from', 0],
            ]) {
                for (const attackType of relations[relation] ?? []) {
                    const previous = multipliers.get(attackType.name) ?? 1;
                    multipliers.set(
                        attackType.name,
                        previous * multiplier
                    );
                }
            }
        }

        const result = {
            weaknesses: [],
            resistances: [],
            immunities: [],
        };

        for (const [name, multiplier] of multipliers) {
            const entry = { name, multiplier };

            if (multiplier === 0) {
                result.immunities.push(entry);
            } else if (multiplier > 1) {
                result.weaknesses.push(entry);
            } else if (multiplier < 1) {
                result.resistances.push(entry);
            }
        }

        const sortByName = (a, b) => a.name.localeCompare(b.name);

        result.weaknesses.sort(sortByName);
        result.resistances.sort(sortByName);
        result.immunities.sort(sortByName);

        return result;
    }, [allDataLoaded, typeNames, typeResults]);

    const attackRelations = useMemo(() => {
        if (!allDataLoaded) return [];

        return typeNames.map((typeName) => {
            const relations =
                typeResults[typeName].data.damage_relations;

            return {
                typeName,
                strongAgainst: (relations.double_damage_to ?? []).map(
                    (item) => item.name
                ),
                weakAgainst: (relations.half_damage_to ?? []).map(
                    (item) => item.name
                ),
                ineffectiveAgainst: (relations.no_damage_to ?? []).map(
                    (item) => item.name
                ),
            };
        });
    }, [allDataLoaded, typeNames, typeResults]);

    if (typeNames.length === 0) {
        return null;
    }

    return (
        <section className="type-effectiveness" data-mode={mode}>
            {typeNames.map((typeName) => (
                <TypeDataLoader
                    key={typeName}
                    typeName={typeName}
                    onTypeData={handleTypeData}
                />
            ))}

            <span className="type-effectiveness-eyebrow">
                TYPE MATCHUPS
            </span>

            <h2>Type Effectiveness</h2>

            <div className="pokemon-type-list">
                {typeNames.map((typeName) => (
                    <span className="pokemon-type-badge" key={typeName}>
                        {typeName}
                    </span>
                ))}
            </div>

            {isLoading && (
                <p className="effectiveness-status">
                    Loading type matchups...
                </p>
            )}

            {hasError && (
                <p className="effectiveness-status effectiveness-error">
                    Some type data could not be loaded. Please try again.
                </p>
            )}

            {effectiveness && (
                <div className="effectiveness-panel">
                    <div className="defense">
                        <h3>Defense</h3>
                        <p className="effectiveness-description">
                            Damage received from opposing attacks
                        </p>

                        <EffectivenessGroup
                            title="Weak to"
                            types={effectiveness.weaknesses}
                            className="is-weak"
                        />

                        <EffectivenessGroup
                            title="Resists"
                            types={effectiveness.resistances}
                            className="is-resistant"
                        />

                        <EffectivenessGroup
                            title="Immune to"
                            types={effectiveness.immunities}
                            className="is-immune"
                        />
                    </div>

                    <div className="attack">
                        <h3>Attack</h3>
                        <p className="effectiveness-description">
                            Effectiveness of this Pokémon's own types
                        </p>

                        {attackRelations.map((relation) => (
                            <div
                                className="attack-type-group"
                                key={relation.typeName}
                            >

                                <EffectivenessGroup
                                    title="Strong against · 2×"
                                    types={relation.strongAgainst.map(
                                        (name) => ({ name, multiplier: 2 })
                                    )}
                                    className="is-resistant"
                                />

                                <EffectivenessGroup
                                    title="Less effective · ½×"
                                    types={relation.weakAgainst.map(
                                        (name) => ({ name, multiplier: 0.5 })
                                    )}
                                    className="is-weak"
                                />

                                <EffectivenessGroup
                                    title="No effect · 0×"
                                    types={relation.ineffectiveAgainst.map(
                                        (name) => ({ name, multiplier: 0 })
                                    )}
                                    className="is-immune"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
