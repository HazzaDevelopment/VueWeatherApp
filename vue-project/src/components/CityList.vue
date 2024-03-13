<template>
  <!-- Iterates over savedCities to display each as a CityCard -->
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>
  <!-- Displays a message if there are no saved cities -->
  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";

// Ref to hold array of saved cities
const savedCities = ref([]);
// Async function to fetch weather data for saved cities
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    // Prepare requests for weather data for each city
    const requests = savedCities.value.map(city =>
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`)
    );
    // Fetch weather data for all cities
    const weatherData = await Promise.all(requests);

    // Simulate delay (for demonstration purposes, can be removed)
    await new Promise(res => setTimeout(res, 1000));

    // Assign fetched weather data to corresponding cities
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};
await getCities(); // Call getCities on component mount

const router = useRouter();
// Navigate to CityView on city card click
const goToCityView = city => {
  router.push({
    name: "CityView",
    params: { state: city.state, city: city.city},
    query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng },
  });
};
</script>
