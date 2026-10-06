<script setup lang="ts">
import Service from '@/components/landing-page/service/Service.vue';
import { Store, Monitor, Video, Palette } from '@lucide/vue';

const services = [
  {
    id: 1,
    slug: 'pengembangan-website',
    title: 'Pengembangan Website',
    description: 'when your heart is broken baby, darkness on the edge of town when your heart is broken baby, darkness on the edge of town',
    icon: Store,
    bgColor: 'bg-red-100 text-red-500'
  },
  {
    id: 2,
    slug: 'ui-ux-desain',
    title: 'UI/UX Desain',
    description: 'Desain antarmuka modern dan intuitif untuk pengalaman pengguna terbaik.',
    icon: Monitor,
    bgColor: 'bg-amber-100 text-amber-500'
  },
  {
    id: 3,
    slug: 'video-editing',
    title: 'Video Editing',
    description: 'Layanan editing video profesional untuk branding dan promosi produk.',
    icon: Video,
    bgColor: 'bg-emerald-100 text-emerald-500'
  },
  {
    id: 4,
    slug: 'graphic-desain',
    title: 'Graphic Desain',
    description: 'Solusi visual kreatif untuk kebutuhan pemasaran dan media sosial.',
    icon: Palette,
    bgColor: 'bg-sky-100 text-sky-500'
  }
];
</script>

<template>
  <section id="services" class="py-16 mt-48 mb-48 px-6 max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
      Layanan Digital Kami Untuk Bisnis Anda
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Service 
        v-for="item in services" 
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        :bgColor="item.bgColor"
        :slug="item.slug"
      />
    </div>
  </section>
</template>