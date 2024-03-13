<template>
    <!-- Container for animated placeholders with styling -->
    <div class="flex py-6 px-3 bg-primary-green rounded-md shadow-md">
      <!-- Left column for longer placeholders -->
      <div class="flex flex-col flex-1 gap-2">
        <AnimatedPlaceholder class="max-w-[50%]" /> <!-- First placeholder, max 50% width -->
        <AnimatedPlaceholder class="max-w-[40%]" /> <!-- Second placeholder, max 40% width -->
      </div>
  
      <!-- Right column for shorter placeholders -->
      <div class="flex flex-col items-end flex-1 gap-2">
        <AnimatedPlaceholder class="max-w-[50px] w-full" /> <!-- First placeholder, max 50px width -->
        <AnimatedPlaceholder class="max-w-[75px] w-full" /> <!-- Second placeholder, max 75px width -->
      </div>
    </div>
  </template>
  
  <script setup>
  // Import AnimatedPlaceholder component for use within this template
  import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
  </script>
  