import {useEffect, useState} from "react";
import axios from "axios";

function useEvolutionChain({pokemon}){
    const id = pokemon?.id;
    const [speciesUrl, setSpeciesUrl] = useState(null);
    const [evolutionMap, setEvolutionMap] = useState(new Map());
    const [parentMap, setParentMap] = useState(new Map());

    async function FetchPokemonSpecies({id}){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        // console.log("response:", response.data);
        // console.log("species url from FetchPokemonSpecies:", response.data.species.url);
        setSpeciesUrl(response.data.species.url);
    }

    // console.log("speciesUrl outside FetchPokemonSpecies:", speciesUrl);

    const [EvolutionChainUrl, setEvolutionChainUrl] = useState(null);
    // console.log("pokemon species:", pokemon?.species);
    // console.log("useEvolutionChain hook received pokemon:", pokemon);
    // console.log("speciesUrl:", speciesUrl);
    function getIdFromUrl(url){
        const parts = url.split("/");
        return Number(parts.filter(Boolean).pop());
    }

    async function FetchEvolutionId({speciesUrl}){
        // console.log("speciesUrl in FetchEvolutionId:", speciesUrl);
        const response = await axios.get(speciesUrl);
        // console.log("response in fetchEvolutionId:", response.data, "evolution_chain url:", response.data?.evolution_chain?.url);
        setEvolutionChainUrl(response.data?.evolution_chain?.url);
    }

    // console.log("Outside EvolutionChainUrl:", EvolutionChainUrl);
    async function FetchEvolutionChain({EvolutionChainUrl}){
        // console.log("evolutionChainUrl in FetchEvolutionChain:", EvolutionChainUrl);
        const response = await axios.get(EvolutionChainUrl);
        let evolutionMap = new Map();
        let parentMap = new Map();
    
        const parentId = getIdFromUrl(response.data.chain.species.url);
        // console.log("parentId in FetchEvolutionChain:", parentId);
        // console.log("response.data.chain:", response.data.chain);
        let child = response.data.chain.evolves_to;
        getEvolutions(parentId, child);
        
        function getEvolutions (parentId, child){
            let evolutionArray = [];
            for(let i = 0; i < child.length; i++){
                // console.log("child[i].species.url:", child[i].species.url);
                parentMap.set(getIdFromUrl(child[i].species.url), parentId);
                evolutionArray.push({
                    id:getIdFromUrl(child[i].species.url), 
                    name: child[i].species.name,
                    url: child[i].species.url
                })
            }
            evolutionMap.set(parentId, evolutionArray);
            // console.log("evolutionArray : ", evolutionArray);
            for(let i = 0; i < child.length; i++){
                const childId = getIdFromUrl(child[i].species.url);
                getEvolutions(childId, child[i].evolves_to);
            }
        }
        setEvolutionMap(evolutionMap);
        setParentMap(parentMap);
    }

    useEffect(() => {
        if(id != null){
            // console.log("id in useEffect:", id);
            FetchPokemonSpecies({id});
        }}, [id]);

    useEffect(() => {
        if(speciesUrl != null){
            // console.log("speciesUrl in useEffect:", speciesUrl);
            FetchEvolutionId({speciesUrl})
        }
    }, [speciesUrl]);

    useEffect(() => {
        if(EvolutionChainUrl){
            FetchEvolutionChain({EvolutionChainUrl});
        }
    }, [EvolutionChainUrl]);
    // console.log("evolutionMap:", evolutionMap);
    // console.log("parentMap:", parentMap);
    return {
        evolutionMap,
        parentMap
    }
}

export default useEvolutionChain;