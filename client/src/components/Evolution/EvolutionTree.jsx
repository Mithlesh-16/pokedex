import "./EvolutionTree.css";
import Node from "./EvolutionNode.jsx";
import { useState, useEffect } from "react";
import useEvolutionChain from "../../hooks/useEvolutionChain.jsx";

export default function EvolutionTree({ pokemon }) {
    const { evolutionMap, parentMap } = useEvolutionChain({ pokemon });

    const [selectedId, setSelectedId] = useState();
    const [expandedNodes, setExpandedNodes] = useState(new Set());

    useEffect(() => {
        setExpandedNodes(new Set());
        setSelectedId(pokemon?.id);
    }, [pokemon]);

    function handleToggle(id) {
        setExpandedNodes(prev => {
            const newSet = new Set(prev);

            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);

            return newSet;
        });
    }
    const newPokemon = {
        id: pokemon?.id,
        name: pokemon?.name,
        url: pokemon?.image
    };
    // console.log("pokemon in EvolutionTree:", pokemon);
    return (
        <div className="evolution-tree">
            <Node
                pokemon={newPokemon}
                expandedNodes={expandedNodes}
                onToggle={handleToggle}
                evolutionMap={evolutionMap}
                parentMap={parentMap}
            />
        </div>
    );
}
