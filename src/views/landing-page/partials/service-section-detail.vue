<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { servicesData } from "@/data/servicesData";
import Navbar from "@/components/landing-page/navbar/Navbar.vue";
import Tools from "@/components/landing-page/tools/Tools.vue";

const route = useRoute();

// Mengambil data berdasarkan slug di URL (/services/pengembangan-website)
const service = computed(() => {
  const slug = route.params.slug as string;
  return servicesData[slug] || null;
});

</script>

<template>
  <Navbar />

  <div v-if="service" class="py-16 max-w-400 mx-auto px-6 font-sans">
    <!-- Hero Section -->
    <div class="text-center my-16 flex flex-col items-center">
      <h1
        class="text-4xl md:text-[42px] font-bold text-slate-900 mb-6 leading-tight max-w-4xl"
      >
        {{ service.title }}
      </h1>
      <p class="text-slate-500 max-w-2xl text-[16px] leading-relaxed mb-8">
        {{ service.subtitle }}
      </p>
      <button
        class="bg-[#33B261] hover:bg-[#2c9a54] transition-colors text-white px-8 py-3.5 rounded-lg font-semibold text-[15px]"
      >
        Konsultasi Sekarang
      </button>
    </div>

    <!-- Section Benefit -->
    <div class="my-24">
      <h2 class="text-3xl font-bold mb-2 text-slate-900">Benefit</h2>
      <p class="text-slate-500 max-w-xl text-base leading-relaxed mb-8">
        {{ service.benefitSubtitle }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, i) in service.benefits"
          :key="i"
          class="p-8 bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-2xl hover:shadow-[0_4px_32px_rgba(0,0,0,0.08)] transition-shadow"
        >
          <span
            class="w-10 h-10 bg-[#33B261] text-white flex items-center justify-center rounded-lg font-bold text-base mb-6"
          >
            {{ i + 1 }}
          </span>
          <h3 class="font-bold text-[18px] text-slate-800 mb-3 leading-snug">
            {{ item.title }}
          </h3>
          <p class="text-[14.5px] text-slate-500 leading-relaxed">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>

    <!-- Section Tool & Tech -->
    <div
      class="bg-[#2BA757] text-white rounded-lg flex flex-col px-12"
    >
      <div class="flex justify-between">
        <!-- Title & Subtitle -->
        <div class="flex flex-col gap-4 py-6">
          <h2 class="text-start font-bold font-sf text-4xl text-white">
            {{ service.techTitle || "Tool & Tech Stack" }}
          </h2>
          <div class="flex flex-col gap-2 text-lg">
            <p
            class="text-white/90 max-w-3xl text-justify leading-relaxed font-sf"
          >
            {{ service.techSubtitle }}
          </p>
          </div>
        </div>
      </div>

      <div>
          <Tools />
        </div>

      <div class="w-full bg-[#1C8F46] text-[#78EBA2] flex justify-start items-center rounded-lg py-2 px-6 my-8">
        <p>$ bunx nexa-audit --target production --strict</p>
      </div>
    </div>
  </div>

  <!-- Jika Layanan Tidak Ditemukan -->
  <div v-else class="text-center py-32">
    <h2 class="text-2xl font-bold text-gray-800">Layanan tidak ditemukan</h2>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
 