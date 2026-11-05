import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './PokemonDetails.css';
import PokemonInfo from "./PokemonInfo.jsx";
import IfExists from "../../services/pokemonService.js";

function PokemonDetails(){
    const {id} = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        let cancel = false;
        async function fetchPokemon(){
            setLoading(true);
            setPokemon(null);
            try{
                const data = await IfExists({id: (Number)(id)})
                if(!cancel) setPokemon(data);
            }
            catch(error){
                console.error(error);
            }finally{
                if(!cancel) setLoading(false);
            }
        }
            fetchPokemon();
            return () => {
                cancel = true;
            }
    },[id]);
    if(loading) return <div className="Loading">Loading Pokemon</div>
    if(!pokemon) return <div>Pokemon not found!</div>
    
    return <PokemonInfo pokemon = {pokemon}/>
}
export default PokemonDetails;