import "./search.css"
import {useState} from "react";
function Search({onSearch}){
    const [input, setInput] = useState("");
    function handleSearch(e){
        let searchTerm = e.target.value.toLowerCase();
        setInput(searchTerm);
        onSearch(searchTerm);
    }
    return (
        <div className="search-input">
        <input type="text" 
        id = "pokemon-name-search"
        placeholder = "Search Pokémon By Name or ID..." 
        value = {input}
        onChange={handleSearch}/>
        </div>
    )
}

export default Search;