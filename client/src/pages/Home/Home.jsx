import Search from "../../components/SearchBar/Search";
import "./Home.css"
import PokemonList from "../../components/PokemonGrid/PokemonList";
function Pokedex(){
    return (
        <div className="pokedex-wrapper">
        <Search />
        <PokemonList />
        </div>
    )
}

export default Pokedex;