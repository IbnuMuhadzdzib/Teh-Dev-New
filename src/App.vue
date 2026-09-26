<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(
  () => route.meta.title as string | undefined,
  (title) => {
    document.title = title ? `${title} · Dashboard Tim` : 'Dashboard Tim';
  },
  { immediate: true },
);
</script>

<template>
  <router-view />
</template>