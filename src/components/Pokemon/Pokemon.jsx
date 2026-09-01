import './pokemon.css';
function Pokemon({name, image}){
    return (
        <div className = "pokemon-wrapper">
            <div className = "pokemon-name">{name}</div>
            <div><img className="pokemon-image" src={image} alt="pokemon img" /></div>
        </div>
    )
}

export default Pokemon;