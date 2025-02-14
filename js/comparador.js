'use strict';

$(document).ready(function() {
    const API_BASE_URL = 'https://pokeapi.co/api/v2';
    let statsChart;

    $('#compare-btn').click(function() {
        const pokemonName1 = $('#pokemon-name-1').val().toLowerCase();
        const pokemonName2 = $('#pokemon-name-2').val().toLowerCase();
        comparePokemon(pokemonName1, pokemonName2);
    });

    function comparePokemon(name1, name2) {
        $.when(
            $.ajax(`${API_BASE_URL}/pokemon/${name1}`),
            $.ajax(`${API_BASE_URL}/pokemon/${name2}`)
        ).done(function(data1, data2) {
            const pokemon1 = data1[0];
            const pokemon2 = data2[0];
            
            const comparisonHtml = `
                <h3>Comparación</h3>
                <table>
                    <tr>
                        <th>Característica</th>
                        <th>${pokemon1.name}</th>
                        <th>${pokemon2.name}</th>
                    </tr>
                    <tr>
                        <td>Altura</td>
                        <td>${pokemon1.height / 10} m</td>
                        <td>${pokemon2.height / 10} m</td>
                    </tr>
                    <tr>
                        <td>Peso</td>
                        <td>${pokemon1.weight / 10} kg</td>
                        <td>${pokemon2.weight / 10} kg</td>
                    </tr>
                    ${pokemon1.stats.map((stat, index) => `
                        <tr>
                            <td>${stat.stat.name}</td>
                            <td>${stat.base_stat}</td>
                            <td>${pokemon2.stats[index].base_stat}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
            
            $('#comparison-result').html(comparisonHtml);
        }).fail(function() {
            $('#comparison-result').html('<p>Error al comparar Pokémon. Verifica los nombres e intenta de nuevo.</p>');
        });
    }
});
