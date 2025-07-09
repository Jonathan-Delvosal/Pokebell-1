// HAUTEUR EN DECIMENTRES ET POIDS EN HECTOGRAMME !!!
const select = document.getElementById('listing');
const btn = document.querySelectorAll('.btn');
const screen = document.getElementById('affichage');
const audio = document.getElementById('audio');
const loader = document.getElementById('loader');
const Info = document.getElementById('Info')
const Stat = document.getElementById('Stat')
const Visu = document.getElementById('Visu')
const Atq = document.getElementById('Atq')
const rightScreen = document.getElementById('rightScreen')
const Cri = document.getElementById('Cri')
const pokedex = document.getElementById('pokedex')
const versusContainer = document.getElementById('versus-container')
const mainContainer = document.getElementById('main-container')
const body = document.querySelector('body')

let imageUrl;
let i = 1;
body.style.backgroundImage= 'url(../Assets/b6d33032-8ed4-4876-a1a7-8e98068b49b2_lakeanim_kristyphlosion_social.gif)';

pokedex.onclick= ()=>{
    body.style.backgroundImage= 'url(../Assets/b6d33032-8ed4-4876-a1a7-8e98068b49b2_lakeanim_kristyphlosion_social.gif)';
    mainContainer.style.display = "flex";
    versusContainer.style.display = "none";
}
versus.onclick= ()=>{
    body.style.backgroundImage= 'url(../Assets/DVMT-6OXcAE2rZY.jpg.afab972f972bd7fbd4253bc7aa1cf27f.jpg)';
    versusContainer.style.display = "flex";
    mainContainer.style.display = "none";
}


fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=1025&offset=0').then(result => result.json()).then(result => {
    for (idPoke of result.results) {
        const option = document.createElement('option');
        option.textContent = idPoke.name;
        option.value = i;
        // console.log(option.value);
        select.append(option);
        i++;
    }
});



select.addEventListener('change', async () => {
    let loca;
    let name;
    let imageUrl;

    try {
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${select.value}/?limit=1025&offset=0`);
        const speciesData = await speciesRes.json();
        name = (speciesData.names.find(n => n.language.name === "fr") || speciesData.names[0]).name;
        loca = speciesData.habitat ? speciesData.habitat.name : "Inconnu";

        const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${select.value}/`);
        const result = await pokemonRes.json();

        let defaultImage = result.sprites.front_default;
        let shiny = result.sprites.front_shiny;

        if (select.value === "9999") {
            screen.style.backgroundImage = `url(../../Assets/pikaben-removebg-preview.png)`;
            loader.style.opacity = '0';
        } else if (select.value === "def") {
            screen.style.backgroundImage = "none";
            loader.style.opacity = '1';
        } else {
            imageUrl = defaultImage;
            screen.style.backgroundImage = `url(${imageUrl})`;
            audio.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${select.value}.ogg`;
            audio.play();
            loader.style.opacity = '0';

            rightScreen.innerHTML =
                `<h2>Nom: ${name} (id: ${result.id})</h2>
                 <h2>Taille : ${result.height / 10} M</h2>
                 <h2>Poids : ${result.weight / 10} KG</h2>
                 <h2>Habitat : ${loca}</h2>`;

            Info.onclick = () => {
                rightScreen.innerHTML =
                    `<h2>Nom: ${name} (id: ${result.id})</h2>
                     <h2>Taille : ${result.height / 10} M</h2>
                     <h2>Poids : ${result.weight / 10} KG</h2>
                     <h2>Habitat : ${loca}</h2>`;
            };

            Stat.onclick = () => {
                rightScreen.innerHTML = '<canvas id="myChart"></canvas>';
                const ctx = document.getElementById('myChart');
                new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: [
                            'Pv',
                            'Atq',
                            'Def-Spé',
                            'Vit',
                            'Def',
                            'Atq-Spé'
                        ],
                        datasets: [{
                            label: `${name}`,
                            data: [
                                result.stats[0].base_stat,
                                result.stats[1].base_stat,
                                result.stats[4].base_stat,
                                result.stats[5].base_stat,
                                result.stats[2].base_stat,
                                result.stats[3].base_stat
                            ],
                            fill: true,
                            backgroundColor: 'rgba(253, 253, 253, 0.2)',
                            borderColor: 'rgb(255, 255, 255)',
                            pointBackgroundColor: 'rgb(255, 99, 132)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(255, 99, 132)'
                        }]
                    },
                    options: {
                        elements: {
                            line: {
                                borderWidth: 3
                            }
                        }
                    }
                });
            };

            Visu.onclick = () => {
                imageUrl = imageUrl === defaultImage ? shiny : defaultImage;
                screen.style.backgroundImage = `url(${imageUrl})`;
            };

            Atq.onclick = () => {
                rightScreen.innerHTML = `<h2>Passif : </h2>`;
                for (let cap of result.abilities) {
                    rightScreen.innerHTML += `<h2>${cap.ability.name}</h2>`;
                }
                rightScreen.innerHTML += `<h2>Type : </h2>`;
                for (let genre of result.types) {
                    rightScreen.innerHTML += `<h2>${genre.type.name}</h2>`;
                }
            };

            Cri.onclick = () => {
                audio.play();
            };
        }

    } catch (error) {
        console.error("Erreur lors du chargement du Pokémon :", error);
    }
});


//Visuel api





// fetch('https://pokeapi.co/api/v2/pokemon/1/?limit=1025&offset=100').then(result => result.json()).then(result => {
//     console.log(result)
//     //POSITION POKEDEX
//     console.log(result.id)
//     //Stats
//     console.log(result.height)
//     console.log(result.weight)
//     //ATTENTION A METTRE DANS UNE FOREACH 
//     console.log(result.types[0].type.name)
//     // console.log(result.types[1].type.name)
//     console.log(result.stats[0].stat.name)
//     console.log(result.stats[0].base_stat)
//     console.log(result.stats[1].stat.name)
//     console.log(result.stats[1].base_stat)
//     console.log(result.stats[2].stat.name)
//     console.log(result.stats[2].base_stat)
//     console.log(result.stats[3].stat.name)
//     console.log(result.stats[3].base_stat)
//     console.log(result.stats[4].stat.name)
//     console.log(result.stats[4].base_stat)
//     console.log(result.stats[5].stat.name)
//     console.log(result.stats[5].base_stat)
//     //Visuel et cri 
//     console.log(result.sprites.front_default)
//     console.log(result.sprites.front_shiny)
//     console.log(result.cries.legacy)
//     //Attaques
//     console.log(result.abilities[0].ability.name)
//     console.log(result.abilities[1].ability.name)
//     // !!!!!!! A FAIRE EN FOREACH OU FOR OF

//     //Evolution 

// });


// fetch('https://pokeapi.co/api/v2/evolution-chain/25/').then(result => result.json()).then(result => {
//     console.log(result);
//     // IF isBaby=== false N'AS PAS DE POKEMON AVANT LUI ELSE IL A EVOLUER D'UN AUTRE 
//     console.log(result.chain.evolves_to[0].species.url)
// });



// fetch('https://pokeapi.co/api/v2/language/5/').then(result=>result.json()).then(result => {
//     console.log(result)
//     // console.log(result.results[0]
// });

// btn.forEach(button => {
//     button.addEventListener('click', () => {
//         button.style.boxShadow = "inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff";
//         // setTimeout
//     });
// });