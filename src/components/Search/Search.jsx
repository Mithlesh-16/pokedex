import "./search.css"
function search(){
    return (
        <div className="search-wrapper">
        <input type="text" 
        id = "pokemon-name-search"
        placeholder = "Search Pokémon..." />
        </div>
    )
}

export default search;