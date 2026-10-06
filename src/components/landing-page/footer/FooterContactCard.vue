<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  icon: Component;
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="flex items-center gap-5 rounded-xl border border-gray-200 px-6 py-5">
    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DEFFEA] text-[#33B261]">
      <component :is="icon" class="h-5 w-5" stroke-width="2" />
    </div>
    <div class="flex flex-col gap-1">
      <span class="font-sf text-sm text-gray-500">{{ label }}</span>
      <span class="font-sf text-lg font-semibold text-gray-900">{{ value }}</span>
    </div>
  </div>
</template>
