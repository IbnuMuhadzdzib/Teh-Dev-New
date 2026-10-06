<!-- components/FaqAccordion.vue -->
<script setup lang="ts">
// Mendefinisikan tipe data untuk props
defineProps<{
  dataFaq: {
    title: string;
    content: string;
  }[];
  // Optional: name group untuk radio button (berguna jika ada >1 accordion di satu halaman)
  accordionName?: string; 
}>();
</script>

<template>
  <div class="w-full divide-y divide-gray-200">
    <div 
      v-for="(faq, index) in dataFaq" 
      :key="index"
      class="collapse collapse-arrow"
    >
      <input 
        type="radio" 
        :name="accordionName || 'default-faq-accordion'" 
      />
      
      <div class="collapse-title px-0 py-5 text-base font-medium text-gray-800">
        {{ faq.title }}
      </div>
      
      <div class="collapse-content px-0 text-sm text-gray-500">
        <p class="pb-5">{{ faq.content }}</p>
      </div>
    </div>
  </div>
</template>