// Star Wars API
document.getElementById("StarWarsButton").addEventListener("click", () => {
    axios.get('https://swapi.dev/api/people/')
    .then(res => {
        res.data.results.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item.name;
            document.getElementById("StarWars").appendChild(listItem);
        });
    });
});
