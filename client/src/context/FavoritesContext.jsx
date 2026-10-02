import {useState, useEffect, createContext} from 'react';

export const FavoritesContext = createContext();
export function FavoritesProvider({children}){
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if(!storedFavorites){
            return [];
        }
        return JSON.parse(storedFavorites);
    });

    console.log("Favorites Provider : ", favorites)
    const isFavorite = function(id){
        return favorites.some((pokemon) => Number(pokemon.id) === Number(id));
    }
    const toggleFavorite = function(pokemon){
        let updatedFavorites;
        if(isFavorite(pokemon.id)){
            updatedFavorites = favorites.filter((p) => Number(p.id) !== Number(pokemon.id));
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