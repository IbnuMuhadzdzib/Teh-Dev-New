<script setup lang="ts">
    defineProps<{
        src: string;
        alt: string;
    }>();
</script>

<template>
  <img :src="src" :alt="alt || 'Foto Tim' " class="w-full h-full object-cover rounded-lg" />
</template>