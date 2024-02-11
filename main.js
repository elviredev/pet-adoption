const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

/*
 * Api Data Météo - Ville de Chelles
 * https://www.infoclimat.fr/api-previsions-meteo.html?id=3025622&cntry=FR
 */
async function start(){
    const weatherPromise = await fetch("https://www.infoclimat.fr/public-api/gfs/json?_ll=48.88109,2.59295&_auth=ABoAF1UrBCYCLwE2VCJWf1kxVGEKfFN0BHgFZghtVClSOVI%2BD20BY1YwBHlTfAI0UXwPalxqU2kKYAdlAHIEeABgAGRVNARjAmsBYVRmVn1ZdVQ8CjNTbQRlBWQIelQoUjBSMg9rAX1WOARgU2ICKFFgD2xcYVN1CmEHYgByBHgAYgBjVTYEYQJpAWRUZlZmWWxUNwoqU3QEYQVnCDZUMlJnUjAPaAE1VjoEYVM3AmdRMA9nXH1TbApvB2YAZQRvAGUAZ1UxBHkCcgEaVBdWf1kqVHYKYFMtBHoFNwg7VGM%3D&_c=b94fdf29ef9a71d11bbb328a194575ae")

    const weatherData = await weatherPromise.json()

    let currentDate = new Date()
    let year = currentDate.getFullYear()
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
    let day = ('0' + currentDate.getDate()).slice(-2)

    let formattedDate = year + '-' + month + '-' + day + ' 13:00:00';
    const temperature = (weatherData[formattedDate].temperature.sol - 273).toFixed(1);

    // console.log(temperature)
    document.querySelector("#temperature-output").textContent = temperature

    /* USA API Datas */
    // const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
    // const weatherData = await weatherPromise.json()
    // const temperature = weatherData.properties.periods[0].temperature
}

start()

/*
 * API data pets.json & create clone template HTML for pet card
 * https://elviredev.github.io/pets-adoption-data/pets.json
 * https://learnwebcode.github.io/bootcamp-pet-data/pets.json
 */
async function petsArea(){
    const petsPromise = await fetch("https://elviredev.github.io/pets-adoption-data/pets.json")
    const petsData = await petsPromise.json()
    petsData.forEach(pet => {
        // créé clone du code html
        const clone = template.content.cloneNode(true)

        // donner un attribut data-species à pet card pour trier les espèces
        clone.querySelector(".pet-card").dataset.species = pet.species

        clone.querySelector("h3").textContent = pet.name
        clone.querySelector(".pet-description").textContent = pet.description
        clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear)

        if (!pet.photo) pet.photo = "images/fallback.jpg"

        clone.querySelector(".pet-card-photo img").src = pet.photo
        clone.querySelector(".pet-card-photo img").alt = `Un ${pet.species} nommé ${pet.name}`

        wrapper.appendChild(clone)
    })
    document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()

function createAgeText(birthYear) {
    // Année en cours
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear

    if (age == 1) return "1 an"
    if (age == 0) return "Moins d'un an"

    return `${age} ans`
}

/*
 * Pet filter button
 */
const allButtons = document.querySelectorAll('.pet-filter button')
allButtons.forEach(el => {
    el.addEventListener('click', handleButtonClick)
})

function handleButtonClick(e) {
    // remove active class from any and all buttons
    allButtons.forEach(el => el.classList.remove('active'))

    // add active class to the specific button that just got clicked
    e.target.classList.add('active')

    // filter the pets
    // récupère valeur de data-filter
    const currentFilter = e.target.dataset.filter
    // parcourir les pet-card et selon leur espèce soit les cacher soit les montrer
    document.querySelectorAll(".pet-card").forEach(el => {
        if (currentFilter == el.dataset.species || currentFilter == 'tous') {
            el.style.display = "grid"
        } else {
            el.style.display = "none"
        }
    })
}

