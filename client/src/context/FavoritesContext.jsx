import {createContext} from 'react';
import {useState} from 'react';
import {useEffect} from 'react';

export const FavoritesContext = createContext();
export function FavoritesProvider({children}){
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if(storedFavorites !== 'undefined'){
            return JSON.parse(storedFavorites);
        }
        return [];
    });
    const isFavorite = function(id){
        return favorites.some((pokemon) => pokemon.id === id);
    }
    const toggleFavorite = function(pokemon){
        let updatedFavorites;
        if(isFavorite(pokemon.id)){
            updatedFavorites = favorites.filter((p) => p.id !== pokemon.id);
        }
        else{
            updatedFavorites = [...favorites, pokemon];
        }
        setFavorites(updatedFavorites);
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesContext.Provider value = {{favorites, toggleFavorite, isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )
}