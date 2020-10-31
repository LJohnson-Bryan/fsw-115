const RickAndMortyContainer = document.getElementById('rickAndMortyData');
const StarWarsContainer = document.getElementById('starWarsData');
const StarTrekContainer = document.getElementById('starTrekData');

async function getData() {
    const RickAndMortyData = await axios.get('https://rickandmortyapi.com/api/character');
    const StarWarsData = await axios.get('https://swapi.dev/api/people');
    const StarTrekData = await axios.get('http://stapi.co/api/v1/rest/character/search');
    listData(RickAndMortyData, StarWarsData, StarTrekData);
}

getData();

function listData(RickAndMorty, StarWars, StarTrek) {
    RickAndMorty.data.results.forEach(character => {
        const p = document.createElement("p");
        p.textContent = character.name;
        RickAndMortyContainer.appendChild(p);
    });

    StarWars.data.results.forEach(character => {
        const p = document.createElement("p");
        p.textContent = character.name;
        StarWarsContainer.appendChild(p);
    });
    
    StarTrek.data.characters.forEach(character => {
        const p = document.createElement("p");
        p.textContent = character.name;
        StarTrekContainer.appendChild(p);
    });

}
