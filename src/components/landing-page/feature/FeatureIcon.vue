<script setup lang="ts">
defineProps<{ bgColor?: string }>();
</script>

<template>
  <div
    class="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover/card:scale-110"
    :class="bgColor || 'bg-gray-100 text-gray-600'"
  >
    <slot />
  </div>
</template>
