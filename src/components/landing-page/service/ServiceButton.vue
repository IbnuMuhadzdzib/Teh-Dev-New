<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  slug: string;
}>();
</script>

<template>
  <RouterLink 
    :to="{ name: 'service-detail', params: { slug } }" 
    class="group inline-flex items-center gap-2 font-semibold text-gray-800 hover:text-[#33B261] transition-colors text-sm"
  >
    Lihat Detail 
    <span class="transition-transform group-hover:translate-x-1">→</span>
  </RouterLink>
</template>