const container = document.querySelector('.container');
const search = document.querySelector('.sbox button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityhide = document.querySelector('.city-hide');

search.addEventListener('click', () => {

    const APIKey = 'afb264515a065dbc4b2b102e5c5decc5';
    const city = document.querySelector('.sbox input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
       
        if (json.cod ==  '404')  {
            cityhide.textContent = city;
            container.style.height = '400px';
            weatherbox.classList.remove('active')
            weatherdetails.classList.remove('active')
            error404.classList.add('active')
            return;
        }

        const image  = document.querySelector('.weather-box img');
        const temperature  = document.querySelector('.weather-box .temp');
        const description  = document.querySelector('.weather-box .des'); 
        const humidity  = document.querySelector('.weather-details .humidity span'); 
        const wind  = document.querySelector('.weather-details .wind span');                            
    
        if (cityhide.textContent == city) {
            return;
        }
        else {
            cityhide.textContent = city; 
                
            container.style.height = '565px';
            container.classList.add('active');
            weatherbox.classList.add('active');
            weatherdetails.classList.add('active');
            error404.classList.remove('active');
            
            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/sun.png'
                    break;
                
                case 'Rain':
                    image.src = 'img/rain.png'
                    break;
                
                case 'Snow':
                    image.src = 'img/snow.png'
                    break;
                
                case 'Mist':
                    image.src = 'img/mist.png'
                    break;
                
                case 'Haze':
                    image.src = 'img/haze.png'
                    break;
                default:
                    image.src = 'img/clouds.png';
                }

        temperature.textContent = `${Math.round(json.main.temp)}°C`;
        description.textContent = json.weather[0].description;
        humidity.textContent = `${json.main.humidity}%`;
        wind.textContent = `${Math.round(json.wind.speed)} m/s`;      

        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = 'clone-info-weather';
        elCloneInfoWeather.classList.add('active-clone');

        elCloneInfoHumidity.id = 'clone-info-humidity';
        elCloneInfoHumidity.classList.add('active-clone');

        elCloneInfoWind.id = 'clone-info-wind';
        elCloneInfoWind.classList.add('active-clone');
        
        setTimeout(() => {
            infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
            infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
            infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
            cloneInfoWeatherFirst.classList.remove('active-clone');
            cloneInfoHumidityFirst.classList.remove('active-clone');
            cloneInfoWindFirst.classList.remove('active-clone');

            setTimeout(() => {
                cloneInfoWeatherFirst.remove();
                cloneInfoHumidityFirst.remove();
                cloneInfoWindFirst.remove();
            }, 2200);
        }
    }

    });

});