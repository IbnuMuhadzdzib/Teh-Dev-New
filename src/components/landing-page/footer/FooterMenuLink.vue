<script setup lang="ts">
defineProps<{
  href: string;
  label: string;
}>();
</script>

<template>
  <a :href="href" class="font-sf text-lg text-[#1f1f1f] hover:text-[#33B261] transition-colors">
    {{ label }}
  </a>
</template>
