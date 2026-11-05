import {useState, useEffect} from 'react';
import typeCache from '../utils/typeCache.js';
import axios from 'axios';

function useTypeEffectiveness(type){
    const [typeData, setTypeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!type){
            setTypeData(null);
            setLoading(false);
            setError(null);
            return;
        }

        let cancel = false;
        async function fetchTypeData(){
            setLoading(true);
            setError(null);
            try{
                const catchData = typeCache.get(type);
                if(catchData){
                    if(!cancel) setTypeData(catchData);
                    return;
                }
                const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
                console.log("Fetched type data for", type, response.data);
                typeCache.set(type, response.data);
                if(!cancel) setTypeData(response.data);

            } catch(err){
                if(!cancel) {
                    setError(err);
                    setTypeData(null);
                }
            }finally{
                if(!cancel) setLoading(false);
            }
        }
        fetchTypeData();
        return () => {
            cancel = true;
        }

    }, [type]);
    return {typeData, loading, error};
}

export default useTypeEffectiveness;