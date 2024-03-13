<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <!-- Search input for city or state with dynamic binding and event handling -->
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <!-- Conditionally rendered dropdown for search results -->
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <!-- Display an error message if there is an error -->
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <!-- Inform the user if no results match their query -->
        <p
          class="py-2"
          v-if="!searchError && mapboxSearchResults.length === 0"
        >
          No results match your query, try a different term.
        </p>
        <!-- List of search results for successful queries -->
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList>
          <template #fallback><p>Loading</p></template>
        </CityList>
      </Suspense>
    </div>

  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";

// Vue Router instance for navigation
const router = useRouter();

// Reactive variables for search functionality
const searchQuery = ref(""); // Holds the current search query
const mapboxSearchResults = ref(null); // Stores the search results from Mapbox
const searchError = ref(null); // Tracks whether an error has occurred during search

const mapboxAPIKey = "pk.eyJ1IjoiaGF6emEtZGV2IiwiYSI6ImNsdGl3czdzODBoMXYycW8wNXppY21taWwifQ.v9YE5kU6poQ1MaJnOY7Upw";

// Preview selected city by navigating to CityView route with parameters
const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "CityView",
    params: { state: state.trim(), city: city.trim() },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

// Function to get search results, debounced to limit API requests
const getSearchResults = () => {
  clearTimeout(queryTimeout.value); // Clear the timeout to reset debounce timer
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value.trim() !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery.value)}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
        searchError.value = false; // Reset error status on successful request
      } catch {
        searchError.value = true; // Set error status on failure
      }
    } else {
      mapboxSearchResults.value = null; // Clear results if query is empty
    }
  }, 300); // Delay for debounce effect
};

// Debounce timer reference
const queryTimeout = ref(null);
</script>