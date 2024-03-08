<template>
    <div>
        <Suspense>
            <AsyncCityView />
            <template #fallback>
                <p>Please wait, loading...</p>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>