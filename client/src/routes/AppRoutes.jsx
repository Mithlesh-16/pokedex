import {Routes, Route} from "react-router-dom";
import Pokedex from "../pages/Home/Home.jsx";
import PokemonDetails from "../pages/PokemonDetails/PokemonDetails.jsx";
import Favorites from "../pages/Favorites/Favorites.jsx";

function AppRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Pokedex/>}/>
            <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
        </Routes>
    )
}

export default AppRoutes;