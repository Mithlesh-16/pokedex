function addToFavorites(pokemon){
    // Implementation for adding a Pokémon to favorites
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = favorites.some((p) => p.id == pokemon.id);
    if(!exists){
        favorites.push(pokemon);
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}
function ShowFavorites(){
    return JSON.parse(localStorage.getItem('favorites')) || [];
}
export{addToFavorites, ShowFavorites};