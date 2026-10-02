<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

import { Store, Monitor, Zap, Tag, Wrench, Smartphone } from "@lucide/vue";

import Feature from "@/components/landing-page/feature/Feature.vue";
import FeatureIcon from "@/components/landing-page/feature/FeatureIcon.vue";
import FeatureLabel from "@/components/landing-page/feature/FeatureLabel.vue";

const features = [
  {
    id: 1,
    label: "Solusi Untuk UMKM",
    bgColor: "bg-red-100 text-red-500",
    icon: Store,
  },
  {
    id: 2,
    label: "Aplikasi Web Berkualitas",
    bgColor: "bg-amber-100 text-amber-500",
    icon: Monitor,
  },
  {
    id: 3,
    label: "Website Responsif",
    bgColor: "bg-emerald-100 text-emerald-500",
    icon: Zap,
  },
  {
    id: 4,
    label: "Digital Branding",
    bgColor: "bg-sky-100 text-sky-500",
    icon: Tag,
  },
  {
    id: 5,
    label: "Maintenance & Support",
    bgColor: "bg-indigo-100 text-indigo-500",
    icon: Wrench,
  },
  {
    id: 6,
    label: "UI UX Clean Design",
    bgColor: "bg-purple-100 text-purple-500",
    icon: Smartphone,
  },
];

import { Teams, TeamImage, TeamName, TeamRole, TeamProfile } from "@/components/landing-page/teams";
import Ibnu from "@/assets/images/teams/teams-ibnu.png"
import Gaza from "@/assets/images/teams/teams-fathya.png"
import Fatir from "@/assets/images/teams/teams-fatir.png"

const teams = [
  {
    id: 1,
    name: 'Ibnu Alif',
    role: 'Fullstack Engineer',
    image: Ibnu,
    linkedin: 'https://www.linkedin.com/in/ibnu-alif-muhadzdzib'
  },
  {
    id: 2,
    name: 'Gaza Fathya',
    role: 'Fullstack Developer',
    image: Gaza,
    linkedin: 'https://www.linkedin.com/in/gfakhdan'
  },
  {
    id: 3,
    name: 'Muhammad Zahir',
    role: 'Fullstack Developer',
    image: Ibnu,
    linkedin: 'https://www.linkedin.com/in/muhammad-zahir-as-sajjad-a90443380/'
  },
  {
    id: 4,
    name: 'Abidal Farzan',
    role: 'Fullstack Developer',
    image: Ibnu,
    linkedin: 'https://www.linkedin.com/in/abidalfarzanr/'
  },
  {
    id: 5,
    name: 'Ahmad Fatir',
    role: 'Designer',
    image: Fatir,
    linkedin: 'https://www.linkedin.com/in/ahmadfatirroziq/'
  }
]

const trackRef = ref<HTMLElement | null>(null);
let marqueeTween: gsap.core.Tween | null = null;

onMounted(() => {
  if (!trackRef.value) return;

  marqueeTween = gsap.to(trackRef.value, {
    xPercent: -50,
    repeat: -1,
    duration: 25,
    ease: "none",
  });
});

onUnmounted(() => {
  marqueeTween?.kill();
});

const handleMouseEnter = () => {
  if (marqueeTween) {
    gsap.to(marqueeTween, { timeScale: 0, duration: 0.8, ease: "power2.out" });
  }
};

const handleMouseLeave = () => {
  if (marqueeTween) {
    gsap.to(marqueeTween, { timeScale: 1, duration: 0.8, ease: "power2.in" });
  }
};
</script>

<template>
  <section
    id="about"
    class="flex min-h-[80vh] flex-col items-center gap-12 py-8"
  >
    <div class="max-w-lg text-center">
      <h1 class="font-sf text-4xl font-bold leading-tight text-gray-800">
        Buat Website yang Membantu <br> Bisnis Anda Tumbuh
      </h1>

      <p class="font-sf mt-4 text-gray-500">
        Kami membantu bisnis Anda tumbuh melalui website, aplikasi, dan desain yang cantik, cepat, dan mudah digunakan.
      </p>
    </div>

    <div class="relative w-full overflow-hidden py-12">
      <div
        class="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-linear-to-r from-white to-transparent"
      ></div>
      <div
        class="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-linear-to-l from-white to-transparent"
      ></div>

      <div
        ref="trackRef"
        class="flex w-max"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div v-for="loop in 2" :key="loop" class="flex gap-6 pr-6">
          <Feature v-for="item in features" :key="`${loop}-${item.id}`">
            <FeatureIcon :bgColor="item.bgColor">
              <!-- 3. Gunakan tag dinamis <component> untuk merender Lucide Icon -->
              <component :is="item.icon" class="h-6 w-6" stroke-width="2" />
            </FeatureIcon>

            <FeatureLabel>{{ item.label }}</FeatureLabel>
          </Feature>
        </div>
      </div>
    </div>
  </section>

  <section class="flex flex-col px-12 py-12">
        <div class="w-full text-center">
      <h1 class="font-sf text-4xl font-bold leading-tight text-gray-800">
        Tim Kami
      </h1>

      <p class="font-sf mt-4 text-gray-500">
        Dari desain hingga pengembangan, kami bantu wujudkan website yang sesuai <br> kebutuhan bisnis Anda.
      </p>
    </div>

    <div class="flex gap-4 py-12">
      <Teams v-for="member in teams" :key="member.id">
        <TeamImage :src="member.image" :alt="member.name" />

        <div class="mt-3 flex items-end justify-between px-1">
          <div class="flex flex-col">
            <TeamName>{{ member.name }}</TeamName>
            <TeamRole>{{ member.role }}</TeamRole>
          </div>

          <TeamProfile :href="member.linkedin" />
        </div>
      </Teams>
    </div>
  </section>
</template>
