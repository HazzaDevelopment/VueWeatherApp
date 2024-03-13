<template>
    <div class="flex flex-col flex-1 items-center">
      <!-- Display a banner if the preview query parameter is present -->
      <div
        v-if="route.query.preview"
        class="text-white p-4 bg-weather-secondary w-full text-center"
      >
        <p>
          You are currently previewing this city, click the "+" icon to start tracking this city.
        </p>
      </div>

      <!-- Display the main weather overview including the city name, date, temperature, and general weather description -->
      <div class="flex flex-col items-center text-white py-12">
        <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
        <h2 class="text-1xl mb-2">{{ route.params.state }}</h2>
        <p class="text-sm mb-12">
          {{
            new Date(weatherData.currentTime).toLocaleDateString("en-gb", {
              weekday: "short",
              day: "2-digit",
              month: "long",
            })
          }}
          {{
            new Date(weatherData.currentTime).toLocaleTimeString("en-gb", {
              timeStyle: "short",
            })
          }}
        </p>
        <p class="text-8xl mb-8">
          {{ Math.round(weatherData.current.temp) }}&deg;
        </p>
        <p>
          Feels like {{ Math.round(weatherData.current.feels_like) }} &deg;
        </p>
        <p class="capitalize">
          {{ weatherData.current.weather[0].description }}
        </p>
        <img
          class="w-[150px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>

      <!-- Divider -->
      <hr class="border-white border-opacity-10 border w-full" />

      <!-- Hourly weather forecast section -->
      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
          <h2 class="mb-4">Hourly Weather</h2>
          <div class="flex py-5 gap-10 overflow-x-scroll custom-scrollbar">
            <div
              v-for="hourData in weatherData.hourly"
              :key="hourData.dt"
              class="flex flex-col gap-4 items-center"
            >
              <p class="whitespace-nowrap text-md">
                {{
                  new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                    hour: "numeric",
                  })
                }}
              </p>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
                alt=""
              />
              <p class="text-xl">
                {{ Math.round(hourData.temp) }}&deg;
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <hr class="border-white border-opacity-10 border w-full" />

      <!-- Weekly weather forecast section -->
      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
          <h2 class="mb-4">7 Day Forecast</h2>
          <div
            v-for="day in weatherData.daily"
            :key="day.dt"
            class="flex items-center"
          >
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString("en-gb", {
                  weekday: "long",
                })
              }}
            </p>
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
              alt=""
            />
            <div class="flex gap-2 flex-1 justify-end">
              <p>H: {{ Math.round(day.temp.max) }}&deg;</p>
              <p>L: {{ Math.round(day.temp.min) }}&deg;</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500" @click="removeCity">
        <i class="fa-solid fa-trash"></i>
        <p>Remove City</p>
      </div>

    </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
// Use Vue Router's route object for accessing query and parameters
const route = useRoute();
// Async function to fetch weather data based on the current route's query parameters (latitude and longitude)
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`
        );

        // Calculate current date & time including timezone offset from the API response
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = weatherData.data.current.dt * 1000 + localOffset;
        weatherData.data.currentTime =
            utc + 1000 * weatherData.data.timezone_offset;

        // Calculate hourly weather time offsets
        weatherData.data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime =
                utc + 1000 * weatherData.data.timezone_offset;
        });

        await new Promise((res) => setTimeout(res, 1000));

        return weatherData.data;
    } catch (err) {
        console.log(err);
    }
};
// Execute the async function and store the response in a reactive variable
const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter(
    (city) => city.id !== route.query.id
  );
  localStorage.setItem(
    "savedCities",
    JSON.stringify(updatedCities)
  );
  router.push({
    name: "home",
  });
};
</script>

<style>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #f0f0f0 #2E4374;
}
</style>