import { useState } from "react";
import { Link } from "react-router-dom";

import Search from "../../components/SearchBar/Search";
import PokemonList from "../../components/PokemonGrid/PokemonList";

import "./Home.css";

function Pokedex() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <main className="pokedex-wrapper">

            {/* Background effects */}
            <div className="pokedex-background-glow pokedex-glow-one"></div>
            <div className="pokedex-background-glow pokedex-glow-two"></div>


            {/* Header */}
            <header className="pokedex-header">

                <Link to="/" className="pokedex-brand">

                    <div className="pokedex-logo">
                        <span></span>
                    </div>

                    <div className="pokedex-brand-text">
                        <span className="pokedex-brand-name">
                            Pokédex
                        </span>

                        <span className="pokedex-brand-subtitle">
                            Pokémon Database
                        </span>
                    </div>

                </Link>


                <nav className="pokedex-header-actions">

                    <Link
                        to="/favorites"
                        className="pokedex-favorites-link"
                    >
                        <span className="favorite-icon">♥</span>
                        Favorites
                    </Link>

                    <div className="pokedex-status">
                        <span className="status-dot"></span>
                        <span>Online</span>
                    </div>

                </nav>

            </header>


            {/* Hero */}
            <section className="pokedex-hero">

                <div className="hero-content">

                    <span className="hero-eyebrow">
                        The Ultimate Pokémon Explorer
                    </span>

                    <h1 className="hero-title">
                        Gotta
                        <span> Explore </span>
                        Them All.
                    </h1>

                    <p className="hero-description">
                        Discover Pokémon, explore their abilities,
                        stats, types and evolution chains.
                    </p>


                    {/* Search */}
                    <div className="home-search-wrapper">
                        <Search onSearch={setSearchValue} />
                    </div>


                    {/* Features */}
                    <div className="hero-meta">

                        <div className="hero-meta-item">
                            <span className="meta-dot"></span>
                            Explore Pokémon
                        </div>

                        <span className="hero-meta-divider"></span>

                        <div className="hero-meta-item">
                            <span className="meta-dot"></span>
                            Detailed Stats
                        </div>

                        <span className="hero-meta-divider"></span>

                        <div className="hero-meta-item">
                            <span className="meta-dot"></span>
                            Save Favorites
                        </div>

                    </div>

                </div>

            </section>


            {/* Pokémon Collection */}
            <section className="pokedex-content">

                <PokemonList SearchValue={searchValue} />

            </section>


            {/* Footer */}
            <footer className="pokedex-footer">

                <span className="footer-brand">
                    Pokédex
                </span>

                <span className="footer-dot">•</span>

                <span>
                    Explore the Pokémon world
                </span>

            </footer>

        </main>
    );
}

export default Pokedex;
