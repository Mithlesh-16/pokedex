/*
This is the Favorites page of the Pokedex application. It displays a list of the user's favorite Pokémon, allowing them to search, filter, and sort their favorites. The page also provides options to reset filters and view detailed information about each Pokémon.
----------------------------------------------------
                My Favorite Pokémon
----------------------------------------------------

[ Search Pokemon... ]

[Type ▼] [HP ▼] [Attack ▼] [Defense ▼]
[Sort By ▼] [Reset Filters]

----------------------------------------------------

▶ Pikachu          Electric      #025
▶ Charizard        Fire/Flying   #006
▼ Gengar           Ghost/Poison  #094
▶ Lucario          Fighting/Steel #448

----------------------------------------------------
Showing 4 Favorites
----------------------------------------------------
*/
import "./Favorites.css";
export default function Favorites(){
    let cnt = 0;
    const favorites = localStorage.getItem('favorites')?JSON.parse(localStorage.getItem('favorites')):[];
    
    const types2 = new Set();
    const abilities2 = new Set();
    const species2 = new Set();
    const moves2 = new Set();

    //creating a map of the favorites for easy access
    const filteredFavorites = new Map();
    for(let i = 0; i < favorites.length; i++){
        filteredFavorites.set(favorites[i].id, favorites[i]);
    }

    //filtering the favorites based on the selected filters
    favorites.forEach((pokemon) => {
        species2.add(pokemon.species);
        pokemon.types.forEach((type) => types2.add(type));
        pokemon.moves.forEach((m) => moves2.add(m));
        pokemon.abilities.forEach((a) => abilities2.add(a));
    });

    //creating a map of the stats for easy access and sorting
    const hpMap = new Map();
    const attackMap = new Map();
    const defenseMap = new Map();
    const specialAttackMap = new Map();
    const specialDefenseMap = new Map();
    const speedMap = new Map();
    favorites.forEach((pokemon) => {
        pokemon.stats.forEach((s) => {
            if(s.name === "hp") hpMap.set(pokemon.id, s.value);
            else if(s.name === "attack") attackMap.set(pokemon.id, s.value);
            else if(s.name === "defense") defenseMap.set(pokemon.id, s.value);
            else if(s.name === "special-attack") specialAttackMap.set(pokemon.id, s.value);
            else if(s.name === "special-defense") specialDefenseMap.set(pokemon.id, s.value);
            else if(s.name === "speed") speedMap.set(pokemon.id, s.value);
        })
    })


    return(
        <div className = "favorites-wrapper">
            <div className="favorites-title">
                <h1>My Favorite Pokémon</h1>
            </div>

            <div className="favorites-header">
                <div className = "favorites-search">
                    <input type="text" placeholder="Search Pokemon..." />
                </div>

                <div className="favorites-filter">
                    <select name="types">
                        {[...types2].map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <select name="moves">
                        {[...moves2].map((move) => (
                            <option key={move} value={move}>
                                {move}
                            </option>
                        ))}
                    </select>

                    <select name="abilities">
                        {[...abilities2].map((ability) => (
                            <option key={ability} value={ability}>
                                {ability}
                            </option>
                        ))}
                    </select>

                    <select name="species">
                        {[...species2].map((species) => (
                            <option key={species} value={species}>
                                {species}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="favorites-sort">
                    <select name="stats" id="5">
                        <option value="hp">Hp</option>
                        <option value="attack">Attack</option>
                        <option value="defense">Defense</option>
                        <option value="special-attack">Special-Attack</option>
                        <option value="special-defense">Special-defense</option>
                        <option value="speed">Speed</option>
                    </select>
                </div> 
            </div>


            <div className="favorites-body">
        
            </div>

            <div className="favorites-footer">
                <span>Showing {favorites.length} Favorites</span>
            </div>
        </div>
    )
}