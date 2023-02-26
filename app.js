const citySelection = document.querySelector('#city-select');
// console.log(citySelection.value);
//add event listener to the variable that contains the city-select id from the html
//this event listener is listening for a selection, once it happens it will fun the function called selectCoordinates
citySelection.addEventListener('change', selectCoordinates)

function selectCoordinates() {
    //crds is a object containing the longitude and latitude of each city
    let crds = {
        'new york' : {lat: 40.7158, lon: -74.0071 }, 
        'paris' : {lat:48.8565 , lon: .3533 },
        'tokyo' : {lat: 35.6895, lon: 139.6917}
    };
    //here we implement a conditional that grabs the selected value and compares it in order to apply the correct lon and lat
    //the getFetch(lat, lon) will take the lat and lon from the crds and plug it into the getFetch function 
    //we send the lat and lon to the api and it sends us back information about that particular cities weather
    if (citySelection.value === 'new-york') {
        let lat = crds['new york'].lat
        let lon = crds['new york'].lon
        getFetch(lat, lon);
    }else if(citySelection.value === 'paris') {
        let lat = crds['paris'].lat
        let lon = crds['paris'].lon
        getFetch(lat, lon);
    }else if(citySelection.value === 'tokyo'){
        let lat = crds['tokyo'].lat
        let lon = crds['tokyo'].lon
        getFetch(lat, lon);
    }else{
        console.log('Big Sad')
    }
}

function getFetch(lat, lon){
    const apiKey = '7d787960824978aaff963a4538c4cf27';
     const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

     fetch(url)
         .then(res => res.json())
         .then(data => {
            console.log(data)
            //in order to implement this data into the dom, we use the code below. 
             document.querySelector('#location').innerText = data.name;
             document.querySelector('#skies').innerText = data.weather[0].description;
             document.querySelector('#temp').innerText = data.main.temp;
})
         .catch(err => {
            console.error(`Error ${err.code}: ${err}`)
         })
        }



const zipCodeInput = document.querySelector('#zip-code');
const zipCodeButton = document.querySelector('#zip-code-lookup');

zipCodeButton.addEventListener('click', bingMapsRequest);

async function bingMapsRequest(){
    // console.log(zipCodeInput.value);
    const zipCode = zipCodeInput.value
    const bingKey = `Al4tX5HAWc8tkzGkCpND5LNmsaiVoSOv8GoxXqn8U36fqoIrCNbmHbASYN5-9qEG`;
    const url = `http://dev.virtualearth.net/REST/v1/Locations/US/-/${zipCode}/-/-?&key=${bingKey}`;


    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.resourceSets[0].resources[0].point.coordinates);

        latitude = data.resourceSets[0].resources[0].point.coordinates[0];
        longitude = data.resourceSets[0].resources[0].point.coordinates[1];
        

        getFetch(latitude, longitude)

    }
    catch(err){
        console.log(`Error: ${err.code} : ${err.message}`)
        document.querySelector(`#error-message`).textContent = `Zip code lookup unsuccessful, please try again`
    }
}
 
