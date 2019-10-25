const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', launchApp)

function launchApp() {
    // console.log("DOM is loaded.")
    fetch("http://localhost:3000/trainers")
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json)
    })
    .catch(function(error) {
        console.log(error);
    })
}