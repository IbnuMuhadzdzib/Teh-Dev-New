<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  slug: string;
}>();
</script>

<template>
  <RouterLink 
    :to="{ name: 'project-detail', params: { slug } }" 
  >
    Lihat Detail 
  </RouterLink>
</template>