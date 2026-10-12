import {useEffect, useState} from "react";
import axios from "axios";

function useEvolutionChain({pokemon}){
    const [EvolutionChainUrl, setEvolutionChainUrl] = useState(null);
    const speciesUrl = pokemon?.species?.url;

    function getIdFromUrl(url){
        const parts = url.split("/");
        return parts.filter(Boolean).pop();
    }

    async function FetchEvolutionId({speciesUrl}){
        const response = await axios.get(speciesUrl);
        setEvolutionChainUrl(response.data.evolution_chain.url);
    }

    let evolutionMap = new Map();
    let parentMap = new Map();
    async function FetchEvolutionChain({EvolutionChainUrl}){
        const response = await axios.get(EvolutionChainUrl);
        const parentId = getIdFromUrl(response.data.chain.species.url);
        let child = response.data.chain.evolves_to;
        getEvolutions(parentId, child);
        
        function getEvolutions(parentId, child){
            let evolutionArray = [];
            for(let i = 0; i < child.length; i++){
                parentMap.set(getIdFromUrl(child[i].species.url), parentId);
                evolutionArray.push({
                    id:getIdFromUrl(child[i].species.url), 
                    name: child[i].species.name,
                    url: child[i].species.url
                })
            }
            evolutionMap.set(parentId, evolutionArray);
            for(let i = 0; i < child.length; i++){
                const childId = getIdFromUrl(child[i].species.url);
                getEvolutions(childId, child[i].evolves_to);
            }
        }
    }

    useEffect(() => {
        if(speciesUrl){
            FetchEvolutionId({speciesUrl})
        }
    }, [speciesUrl]);

    useEffect(() => {
        if(EvolutionChainUrl){
            FetchEvolutionChain({EvolutionChainUrl});
        }
    }, [EvolutionChainUrl]);

    return {
        evolutionMap,
        parentMap
    }
}

export default useEvolutionChain;