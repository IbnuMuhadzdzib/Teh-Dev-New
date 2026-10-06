<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  icon: Component;
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="flex items-center gap-4 rounded-xl border border-gray-200 px-5 py-4">
    <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-[#DEFFEA] text-[#33B261]">
      <component :is="icon" class="h-5 w-5" stroke-width="2" />
    </div>
    <div class="flex flex-col gap-0.5">
      <span class="font-sf text-xs text-gray-500">{{ label }}</span>
      <span class="font-sf text-base font-medium text-gray-800">{{ value }}</span>
    </div>
  </div>
</template>
