import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

// Router configuration
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use browser history
  routes: [
    {
      path: "/", // Root path for home view
      name: "home",
      component: HomeView, // Component to render for this route
      meta: {
        title: "Home", // Meta title for this route
      },
    },
    {
      path: "/weather/:state/:city", // Dynamic route for weather by state and city
      name: "CityView",
      component: CityView, // Component to render for this route
      meta: {
        title: "Weather", // Meta title for this route
      },
    },
  ],
});

// Global navigation guard to set document title based on route meta or parameters
router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state // Check if state parameter exists
      ? `${to.params.city}, ${to.params.state}` // Use city and state in title
      : to.meta.title // Use meta title if state is not available
  } | The Local Weather`; // Append application name to title
  next(); // Continue to the route
});

export default router; // Export the configured router
