const apiKey = 'fb041b5f56c2383d1ebc04f29cf3f072';


async function fetchWeatherData(city) {
    try {
           const response = await fetch(
             `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
           );
           if (!response.ok) {
            throw new Error("Unable to fetch weather data");
           }
           const data = await response.json();
           console.log(data);
           // console.log(data.main.temp);
          // console.log(data.name);
          // console.log(data.wind.speed);
         // console.log(data.main.humidity);
         // console.log(data.visibility);
          updateWeatherUI(data);
       } catch(error) {
            console.error(error);
        }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");

//fetchWeatherData();

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}`;
    windSpeed.textContent = `${data.wind.speed} km/h`
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility/1000} km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener('submit', function(e){
    e.preventDefault();

   const city = inputElement.value;
   if(city!=''){
       fetchWeatherData(city);
       inputElement.value = "";
   }
})