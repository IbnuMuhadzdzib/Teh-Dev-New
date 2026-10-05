<script setup lang="ts">
    import Navbar from '@/components/landing-page/navbar/Navbar.vue';

    import HeroSection from './sections/hero-section.vue';
    import AboutSection from './sections/about-section.vue';
    import ServiceSection from './sections/service-section.vue';
</script>

<template>
    <main>
        <Navbar />

        <div class="content-wrapper"> 
            <HeroSection />
            <AboutSection />
            <ServiceSection />
        </div>
    </main>
</template>