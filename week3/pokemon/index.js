const xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.vschool.io/pokemon", true)
xhr.send();

xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
        const JSONData = xhr.responseText;
        const data = JSON.parse(JSONData);  
        console.log(data.objects[0].pokemon);
        createPokemonListing(data.objects[0].pokemon);
        document.getElementById("count").innerText = `Listing data for ${data.objects[0].pokemon.length} pokemon...`
    }
}

const createPokemonListing = (arr) => {
    for(i = 0; i < arr.length; i++) {
        const pokemonItem = document.createElement("li");
        pokemonItem.innerText = arr[i].name + " - Data: " + arr[i].resource_uri;
        document.getElementById("pokemon").appendChild(pokemonItem);
    }
}