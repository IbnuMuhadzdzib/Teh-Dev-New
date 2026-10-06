<script setup lang="ts">
defineProps<{
  src: string;
  title?: string;
}>();
</script>

<template>
  <iframe
    :src="src"
    :title="title || 'Embedded Map'"
    class="h-[235px] w-full rounded-2xl border-0"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    allowfullscreen
  ></iframe>
</template>
