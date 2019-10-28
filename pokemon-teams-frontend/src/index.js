const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// *Both of the below functions do the same thing: window.onload & DOMContentLoaded.
// document.addEventListener('DOMContentLoaded', launchApp)
window.onload = launchApp

function launchApp() {
    // Define <main> element 
    const main = document.getElementsByTagName("main");

        fetch("http://localhost:3000/trainers")
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json)
        const trainers = json
        for (const trainer of trainers) {
                        
            // Creating a separate "card" and placing it in <main>
            const card = document.createElement("div")
            card.className = "card"
            card.setAttribute("data-id", trainer["id"])
            main[0].appendChild(card)
            
            // Adding the <p> tag with trainer's name to the card.
            const cardP = document.createElement("p")
            cardP.className = "cardP"
            cardP.innerText = trainer["name"]
            card.appendChild(cardP)
            
            // Adding the "Add Pokemon" button to the card.
            const addPokemonButton = document.createElement("button")
            addPokemonButton.setAttribute("data-trainer-id", trainer["id"])
            addPokemonButton.innerText = "Add Pokemon"
            card.appendChild(addPokemonButton)
            // Add functionality to "Add Pokemon" button.            
            addPokemonButton.addEventListener("click", addPokemon)

            // Add unordered list to card.
            const cardList = document.createElement("ul")
            card.appendChild(cardList)
            
            // Add every Pokemon and "release" button to list.
            const pokemons = trainer.pokemons
            for (const pokemon of pokemons) {
                const listItem = document.createElement("li")
                listItem.innerText = `${pokemon["nickname"]} (${pokemon.species})`
                const releaseButton = document.createElement("button")
                releaseButton.setAttribute("data-pokemon-id", pokemon["id"])
                releaseButton.className = "release"
                releaseButton.innerText = "Release"
                releaseButton.addEventListener("click", releasePokemon)
                listItem.appendChild(releaseButton)
                cardList.appendChild(listItem)
            }
        }
    })
    .catch(function(error) {
        console.log(error);
    })

    // Add Pokemon function.
    function addPokemon(event) {
        // Get the trainer ID here before calling fetch.
        trainerId = event.target.dataset.trainerId

        pokemonObj = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: trainerId
            })
        }

        fetch(POKEMONS_URL, pokemonObj)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (pokemon) {
            console.log(pokemon)
            // const listItem = document.createElement("li")
            // listItem.innerText = `${pokemon.data.attributes.nickname} (${pokemon.data.attributes.nickname})`;
            // const releaseButton = document.createElement("button")
            // releaseButton.setAttribute("data-pokemon-id", pokemon["data"]["id"])
            // releaseButton.className = "release"
            // releaseButton.innerText = "Release"
            // listItem.appendChild(releaseButton)
            // const card = event.target.parentNode
            // const cardList = card.querySelector("ul")
            // cardList.appendChild(listItem)
        })
    }
    
    function releasePokemon(event) {
        pokemonId = event.target.dataset.pokemonId

        fetch(`${BASE_URL}/pokemons/${pokemonId}`, {method: "DELETE"})
    }
}