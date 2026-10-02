<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  items: {
    type: Array as () => Array<{
      name: string;
      role: string;
      image: string;
      linkedin: string;
    }>,
    required: true,
  },
  height: {
    type: [Number, String],
    default: 480,
  },
  gap: {
    type: [Number, String],
    default: 16,
  }
});

const activeIndex = ref(0);
</script>

<template>
  <div 
    class="flex w-full" 
    :style="{ gap: `${gap}px`, height: typeof height === 'number' ? `${height}px` : height }"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="group relative overflow-hidden rounded-2xl cursor-pointer transition-[flex] duration-500 ease-in-out flex flex-col bg-white border border-gray-100 shadow-sm"
      :class="activeIndex === index ? 'flex-[3_3_0%]' : 'flex-[1_1_0%]'"
      @mouseenter="activeIndex = index"
      @click="activeIndex = index"
    >
      <!-- Area Foto -->
      <div class="flex-1 w-full relative bg-gray-50 overflow-hidden border-b border-gray-100">
        <img
          :src="item.image"
          :alt="item.name"
          class="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700"
          :class="activeIndex === index ? 'grayscale-0' : 'grayscale'"
        />
      </div>

      <!-- Area Teks & Tombol LinkedIn -->
      <div class="h-20 w-full bg-white px-5 py-4 flex items-center justify-between shrink-0">
        <div class="flex flex-col min-w-35">
          <span class="font-bold text-gray-900 text-[16px] leading-tight truncate">{{ item.name }}</span>
          <span class="text-sm text-gray-500 truncate mt-0.5">{{ item.role }}</span>
        </div>
        
        <!-- Tombol dengan SVG LinkedIn langsung -->
        <a 
          :href="item.linkedin" 
          target="_blank" 
          class="text-[#33B261] hover:text-white hover:bg-[#33B261] transition-colors ml-4 shrink-0 flex items-center justify-center p-2 rounded-md"
          title="LinkedIn Profile"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="w-5 h-5"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect width="4" height="12" x="2" y="9"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>
      </div>
      
      <!-- Efek Gelap untuk Card yang sedang tidak aktif -->
      <div 
        class="absolute inset-0 bg-black/5 transition-opacity duration-500 pointer-events-none"
        :class="activeIndex === index ? 'opacity-0' : 'opacity-100'"
      ></div>
    </div>
  </div>
</template>