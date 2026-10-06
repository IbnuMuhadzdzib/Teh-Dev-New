<!-- components/FaqSection.vue -->
<script setup lang="ts">
import FaqAccordion from "@/components/landing-page/accordion/Accordion.vue";

// Definisikan datanya di sini
const faqDataList = [
  {
    title: "Kenapa member teh dev ganteng semua?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio nobis ad aut saepe possimus quaerat iste ipsam odit provident eos?",
  },
  {
    title: "Kenapa member teh dev ganteng semua?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio nobis ad aut saepe possimus quaerat iste ipsam odit provident eos?",
  },
  {
    title: "Kenapa member teh dev ganteng semua?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio nobis ad aut saepe possimus quaerat iste ipsam odit provident eos?",
  },
];
</script>

<template>
  <section class="max-w-3xl mt-52 mx-auto py-16 px-6">
    <div class="text-center mb-10">
        <h1 class="font-sf text-3xl font-bold leading-tight text-gray-800">
      Pertanyaan yang Sering Ditanyakan
    </h1>
    <p class="text-sm text-[#A3A3A3] mt-3">
        I’m not bad yeah, you can’t make me act right. Don’t call me darling i’m too rude
    </p>
    </div>

    <div>
        <FaqAccordion :dataFaq="faqDataList" accordionName="main-faq" />
    </div>
  </section>
</template>
