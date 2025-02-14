'use strict';

$(document).ready(function() {
    const API_BASE_URL = 'https://pokeapi.co/api/v2';
    let statsChart;

    $('#search-btn').click(function() {
        const pokemonName = $('#pokemon-name').val().toLowerCase();
        fetchPokemonDetails(pokemonName);
    });

    function fetchPokemonDetails(pokemonName) {
        $.ajax({
            url: `${API_BASE_URL}/pokemon/${pokemonName}`,
            method: 'GET',
            success: function(data) {
                displayPokemonDetails(data);
                updateStatsChart(data.stats);
            },
            error: function() {
                $('#pokemon-details').html('<p>Pokémon no encontrado. Intenta de nuevo.</p>');
                if (statsChart) {
                    statsChart.destroy();
                }
            }
        });
    }

    function displayPokemonDetails(pokemon) {
        $('#pokemon-details').html(`
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Altura: ${pokemon.height / 10} m</p>
            <p>Peso: ${pokemon.weight / 10} kg</p>
            <p>Tipos: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            <h3>Habilidades:</h3>
            <ul>
                ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
            </ul>
        `);
    }

    function updateStatsChart(stats) {
        const ctx = document.getElementById('stats-chart').getContext('2d');
        
        if (statsChart) {
            statsChart.destroy();
        }

        statsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: stats.map(stat => stat.stat.name),
                datasets: [{
                    label: 'Estadísticas',
                    data: stats.map(stat => stat.base_stat),
                    backgroundColor: 'rgb(238, 21, 21, 0.6)',
                    borderColor: '#3c5aa6',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: false
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
});
