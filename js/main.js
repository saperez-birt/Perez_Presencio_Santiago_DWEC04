'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'https://pokeapi.co/api/v2';

    // Función para cargar el top 10 de Pokémon
    function loadTopPokemon() {
        fetch(`${API_BASE_URL}/pokemon?limit=10`)
            .then(response => response.json())
            .then(data => {
                const pokemonList = document.getElementById('pokemon-list');
                data.results.forEach((pokemon, index) => {
                    fetch(pokemon.url)
                        .then(response => response.json())
                        .then(pokemonData => {
                            const pokemonCard = document.createElement('div');
                            pokemonCard.className = 'pokemon-card';
                            pokemonCard.innerHTML = `
                                <img src="${pokemonData.sprites.front_default}" alt="${pokemon.name}">
                                <h3>${index + 1}. ${pokemon.name}</h3>
                                <p>Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                            `;
                            pokemonList.appendChild(pokemonCard);
                        });
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // Función para cargar estadísticas globales
    function loadGlobalStats() {
        fetch(`${API_BASE_URL}/pokemon?limit=1`)
            .then(response => response.json())
            .then(data => {
                const totalPokemon = data.count;
                document.getElementById('global-stats').innerHTML = `
                    <p>Total de Pokémon registrados: ${totalPokemon}</p>
                `;
            })
            .catch(error => console.error('Error:', error));

        fetch(`${API_BASE_URL}/type`)
            .then(response => response.json())
            .then(data => {
                const totalTypes = data.count;
                document.getElementById('global-stats').innerHTML += `
                    <p>Total de Tipos de Pokémon: ${totalTypes}</p>
                `;
            })
            .catch(error => console.error('Error:', error));

        fetch(`${API_BASE_URL}/ability`)
            .then(response => response.json())
            .then(data => {
                const totalAbilities = data.count;
                document.getElementById('global-stats').innerHTML += `
                    <p>Total de Habilidades de Pokémon: ${totalAbilities}</p>
                `;
            })
            .catch(error => console.error('Error:', error));
    }

    loadTopPokemon();
    loadGlobalStats();
});
