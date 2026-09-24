import './pokemon.css';
import {Link} from "react-router-dom";
function Pokemon({name, image, id}){
    return (
        <div className = "pokemon-wrapper">
            <Link to={`/pokemon/${id}`} style = {{textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div className = "pokemon-id">{String(id).padStart(3, "0")}</div>
                <div><img className="pokemon-image" src={image} alt="pokemon img" /></div>
                <div className = "pokemon-name">{name}</div>
            </Link>
            
        </div>
    )
}

export default Pokemon;