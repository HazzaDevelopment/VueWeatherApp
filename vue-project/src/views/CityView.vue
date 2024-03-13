<template>
    <div>
      <!-- Suspense component to handle asynchronous component loading -->
      <Suspense>
        <!-- Default slot for the asynchronously loaded component -->
        <template #default>
          <AsyncCityView /> <!-- Component to load asynchronously -->
        </template>
        <!-- Fallback slot to show while the asynchronous component is loading -->
        <template #fallback>
          <CityViewSkeleton /> <!-- Skeleton or placeholder component shown during loading -->
        </template>
      </Suspense>
    </div>
  </template>
  
  <script setup>
  // Importing components
  import AsyncCityView from "../components/AsyncCityView.vue"; // Asynchronously loaded component
  import CityViewSkeleton from "../components/CityViewSkeleton.vue"; // Fallback skeleton component
  </script>
  