import './pokemon.css';
import { Link } from "react-router-dom";
import { useFavorites } from '../../hooks/useFavorites.js';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Pokemon({ pokemon }) {

    const { isFavorite, toggleFavorite } = useFavorites();

    const favorite = isFavorite(pokemon?.id);

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(pokemon);
    };

    return (
        <article className={`pokemon-wrapper ${favorite ? 'is-favorite' : ''}`}>

            {/* Pokemon Number */}
            <div className="pokemon-id">
                #{String(pokemon?.id).padStart(3, "0")}
            </div>


            {/* Pokemon Card Link */}
            <Link
                to={`/pokemon/${pokemon?.id}`}
                className="pokemon-link"
            >

                {/* Background Glow */}
                <div className="pokemon-glow"></div>


                {/* Image Container */}
                <div className="pokemon-image-wrapper">

                    <div className="pokemon-image-circle"></div>

                    <img
                        className="pokemon-image"
                        src={pokemon?.image}
                        alt={pokemon?.name}
                    />

                </div>


                {/* Pokemon Name */}
                <h2 className="pokemon-name">
                    {pokemon?.name}
                </h2>


                {/* View Details */}
                <span className="pokemon-details">
                    View details
                    <span className="arrow">→</span>
                </span>

            </Link>


            {/* Favorite Button */}
            <button
                className={`favorite-btn ${favorite ? 'favorite-active' : ''}`}
                onClick={handleFavorite}
                aria-label={
                    favorite
                        ? `Remove ${pokemon?.name} from favorites`
                        : `Add ${pokemon?.name} to favorites`
                }
            >
                {favorite ? (
                    <FaHeart className="heart-filled" />
                ) : (
                    <FaRegHeart className="heart-empty" />
                )}
            </button>

        </article>
    );
}

export default Pokemon;