// Rick and Morty API
document.getElementById("RickMortyButton").addEventListener("click", () => {
    axios.get('https://rickandmortyapi.com/api/character')
    .then(res => {
        res.data.results.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item.name;
            document.getElementById("RickAndMorty").appendChild(listItem);
        });
    });
});
