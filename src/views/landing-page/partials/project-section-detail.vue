<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { projectsData } from "@/data/projectsData";
import Navbar from "@/components/landing-page/navbar/Navbar.vue";

const route = useRoute();

// Mengambil data berdasarkan slug di URL (/services/pengembangan-website)
const project = computed(() => {
  const slug = route.params.slug as string;
  return projectsData[slug] || null;
});

</script>

<template>
    <Navbar />

    <div v-if="project">
        <h1>{{ project.title }}</h1>
    </div>
</template>