<script setup lang="ts">
    import Navbar from '@/components/landing-page/navbar/Navbar.vue';

    import HeroSection from './sections/hero-section.vue';
    import FeaturesSection from './sections/features-section.vue';
</script>

<template>
    <main>
        <Navbar />

        <div class="content-wrapper"> 
            <HeroSection />
            <FeaturesSection />
        </div>
    </main>
</template>