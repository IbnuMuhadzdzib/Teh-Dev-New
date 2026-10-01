<script setup lang="ts">
defineProps<{
  href: string;
  label: string;
}>();
</script>

<template>
  <a :href="href" class="text-gray-600 font-sf hover:text-green-600 text-md font-medium transition-colors">
    {{ label }}
  </a>
</template>