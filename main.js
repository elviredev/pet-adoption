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
    // console.log(temperature)
}

start()
