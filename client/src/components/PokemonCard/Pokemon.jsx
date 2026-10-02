import './pokemon.css';
import {Link} from "react-router-dom";
import {useFavorites} from '../../hooks/useFavorites.js';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
function Pokemon({pokemon}){
    const {isFavorite, toggleFavorite} = useFavorites();
    return (
        <div className = "pokemon-wrapper">
            <Link to={`/pokemon/${pokemon?.id}`} style = {{textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div className = "pokemon-id">{String(pokemon?.id).padStart(3, "0")}</div>
                <div><img className="pokemon-image" src={pokemon?.image} alt="pokemon img" /></div>
                <div className = "pokemon-name">{pokemon?.name}</div>
                <button className="favorite-btn" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(pokemon);
                }}>
                    {
                    isFavorite(pokemon?.id)? <FaHeart className = "heart-filled"/>: <FaRegHeart className="heart-empty"/>
                    }
                </button>
            </Link>
            
        </div>
    )
}

export default Pokemon;