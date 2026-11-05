import axios from "axios";

const pokemons = new Map();
const pendingRequest = new Map();

function DownloadPokemon({ id }) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const request = axios.get(url).then(async response => {
        const data = response.data;

        // Load the species information separately.
        const speciesResponse = await axios.get(data.species.url)
            .catch(error => {
                console.error("Could not load species information:", error);
                return null;
            });

        const speciesData = speciesResponse?.data;

        const englishEntry = speciesData?.flavor_text_entries?.find(
            entry => entry.language.name === "en"
        );

        const description = englishEntry?.flavor_text
            ?.replace(/[\n\f\r]/g, " ")
            .replace(/\s+/g, " ")
            .trim() || "Description unavailable.";

        const PokeData = {
            id: data.id,
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
            front_default: data.sprites.front_default,
            height: data.height,
            weight: data.weight,
            types: data.types.map(t => t.type.name),

            moves: data.moves.map(m => ({
                name: m.move.name,
                url: m.move.url
            })),

            abilities: data.abilities.map(a => ({
                name: a.ability.name,
                url: a.ability.url
            })),

            stats: data.stats.map(s => ({
                name: s.stat.name,
                value: s.base_stat
            })),

            species: data.species.name,
            description
        };

        pokemons.set(id, PokeData);
        return PokeData;

    }).finally(() => {
        pendingRequest.delete(id);
    });

    pendingRequest.set(id, request);
    return request;
}

function IfExists({ id }) {
    const pokemonId = Number(id);

    if (pokemons.has(pokemonId)) {
        return Promise.resolve(pokemons.get(pokemonId));
    }

    if (pendingRequest.has(pokemonId)) {
        return pendingRequest.get(pokemonId);
    }

    return DownloadPokemon({ id: pokemonId });
}

export default IfExists;
