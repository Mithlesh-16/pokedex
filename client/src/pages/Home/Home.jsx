import Search from "../../components/SearchBar/Search";
import "./Home.css";
import PokemonList from "../../components/PokemonGrid/PokemonList";
import {useState} from "react";

function Pokedex() {
    const [searchValue, setSearchValue] = useState("");
    return (
        <main className="pokedex-wrapper">

            {/* =========================================
                BACKGROUND EFFECTS
            ========================================= */}

            <div className="pokedex-background-glow pokedex-glow-one"></div>
            <div className="pokedex-background-glow pokedex-glow-two"></div>


            {/* =========================================
                HEADER / NAVBAR
            ========================================= */}

            <header className="pokedex-header">

                <div className="pokedex-brand">

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

                </div>


                <div className="pokedex-status">

                    <span className="status-dot"></span>

                    <span>
                        Online
                    </span>

                </div>

            </header>


            {/* =========================================
                HERO / SEARCH
            ========================================= */}

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
                        Search, discover and explore Pokémon,
                        their abilities, stats, types and moves.
                    </p>


                    {/* Search */}
                    <div className="home-search-wrapper">
                        <Search onSearch={setSearchValue}/>
                    </div>


                    {/* Quick stats */}
                    <div className="hero-meta">

                        <div className="hero-meta-item">
                            <span className="meta-dot"></span>
                            <span>Explore Pokémon</span>
                        </div>

                        <div className="hero-meta-divider"></div>

                        <div className="hero-meta-item">
                            <span className="meta-dot"></span>
                            <span>Detailed Stats</span>
                        </div>

                        <div className="hero-meta-divider"></div>

                        <div className="hero-meta-item">
                            <span className="meta-dot"></span>
                            <span>Save Favorites</span>
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                POKEMON LIST
            ========================================= */}

            <section className="pokedex-content">

                <PokemonList SearchValue={searchValue} />
                

            </section>


            {/* =========================================
                FOOTER
            ========================================= */}

            <footer className="pokedex-footer">

                <span>
                    Pokédex
                </span>

                <span className="footer-dot">
                    •
                </span>

                <span>
                    Explore the Pokémon world
                </span>

            </footer>

        </main>
    );
}

export default Pokedex;