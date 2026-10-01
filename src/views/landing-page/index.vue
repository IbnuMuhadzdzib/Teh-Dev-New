<script setup lang="ts">
    import Navbar from '@/components/landing-page/navbar/Navbar.vue';

    import HeroSection from './sections/hero-section.vue';
</script>

<template>
    <main>
        <Navbar />

        <div class="content-wrapper"> 
            <HeroSection />
        </div>
    </main>
</template>