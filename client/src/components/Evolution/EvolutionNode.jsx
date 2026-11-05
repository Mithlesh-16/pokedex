import "./EvolutionTree.css";
export default function Node({
    pokemon,
    expandedNodes,
    onToggle,
    evolutionMap,
    parentMap
}) {
    const children = evolutionMap?.get(pokemon?.id) ?? [];
    const isExpanded = expandedNodes.has(pokemon?.id);
    return (
        <div className="evolution-node">
            <button
                type="button"
                className="pokemon-card"
                onClick={() => onToggle(pokemon?.id)}
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${pokemon?.name}`}
            >
                <div className="pokemon-id">
                    #{String(pokemon?.id ?? "").padStart(3, "0")}
                </div>

                <div className="pokemon-image-wrapper">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
                        alt={pokemon?.name ?? "Pokémon"}
                        loading="lazy"
                    />
                </div>

                <div className="pokemon-name">
                    {pokemon?.name}
                </div>

                {children.length > 0 && (
                    <div className="evolution-toggle">
                        {isExpanded ? "− Collapse" : "+ Evolve"}
                    </div>
                )}
            </button>

            {isExpanded && children.length > 0 && (
                <div className="evolution-children">
                    {children.map(child => (
                        <Node
                            key={child.id}
                            pokemon={child}
                            expandedNodes={expandedNodes}
                            onToggle={onToggle}
                            evolutionMap={evolutionMap}
                            parentMap={parentMap}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
