<script setup lang="ts">
    defineProps<{
        alt: string;
        src: string;
    }>();
</script>

<template>
    <img :src="src" :alt="alt">
</template>