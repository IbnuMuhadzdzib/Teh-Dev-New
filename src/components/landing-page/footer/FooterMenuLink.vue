<script setup lang="ts">
defineProps<{
  href: string;
  label: string;
}>();
</script>

<template>
  <a :href="href" class="text-gray-700 font-sf text-base hover:text-green-600 transition-colors">
    {{ label }}
  </a>
</template>
