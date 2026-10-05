<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from "vue";
    import gsap from "gsap";

    import Feedback from '@/components/landing-page/feedback/Feedback.vue'

    import SampleImage from '@/assets/images/sample/sample-2.png'

    const feedbacksData=[
        {
            word: 'Ahmad Fatir Roziq is a highly reliable designer with strong expertise in Graphic Design. He consistently delivers compelling, well-structured work with great attention to detail. Graphic Design. ',
            src: SampleImage,
            alt:'Feedback 1',
            name: 'Fauzan Muhammad',
            role: 'Founder of Deepverse Team, President Pions Council',
        },
        {
            word: 'Ahmad Fatir Roziq is a highly reliable designer with strong expertise in Graphic Design. He consistently delivers compelling, well-structured work with great attention to detail. Graphic Design. ',
            src: SampleImage,
            alt:'Feedback 1',
            name: 'Fauzan Muhammad',
            role: 'Founder of Deepverse Team, President Pions Council',
        },
        {
            word: 'Ahmad Fatir Roziq is a highly reliable designer with strong expertise in Graphic Design. He consistently delivers compelling, well-structured work with great attention to detail. Graphic Design. ',
            src: SampleImage,
            alt:'Feedback 1',
            name: 'Fauzan Muhammad',
            role: 'Founder of Deepverse Team, President Pions Council',
        },
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
  <section class="mt-72">
    <div>
      <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
        Apa Kata Mereka?
      </h2>
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
          <Feedback
            v-for="(item, index) in feedbacksData"
            :key="`${loop}-${index}`"
            :word="item.word"
            :src="item.src"
            :alt="item.alt"
            :name="item.name"
            :role="item.role"
          />
        </div>
      </div>
    </div>
  </section>
</template>
