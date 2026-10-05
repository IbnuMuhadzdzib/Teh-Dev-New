<script setup lang="ts">
    defineProps<{
        bgColor: string;
    }>();
</script>

<template>
  <div
    class="p-2 rounded-sm"
    :class="bgColor || 'bg-gray-100 text-gray-600'"
  >
    <slot />
  </div>
</template>