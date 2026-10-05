<!-- src/components/landing-page/service/Service.vue -->
<script setup lang="ts">
import ServiceIcon from "./ServiceIcon.vue";
import ServiceTitle from "./ServiceTitle.vue";
import ServiceDesc from "./ServiceDesc.vue";
import ServiceButton from "./ServiceButton.vue";

defineProps<{
  title: string;
  description: string;
  icon: any;
  bgColor?: string;
  slug: string;
}>();
</script>

<template>
  <div
    class="bg-white p-8 rounded-2xl border border-gray-200 flex flex-col items-start gap-4 hover:shadow-md transition-all"
  >
    <ServiceIcon :bgColor="bgColor || 'bg-gray-100 text-gray-600'">
      <component :is="icon" class="w-8 h-8" />
    </ServiceIcon>

    <div>
      <ServiceTitle>{{ title }}</ServiceTitle>
      <ServiceDesc>{{ description }}</ServiceDesc>
    </div>

    <div class="mt-auto pt-4">
      <ServiceButton :slug="slug" />
    </div>
  </div>
</template>
