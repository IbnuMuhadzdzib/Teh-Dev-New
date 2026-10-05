<script setup lang="ts">
    import Navbar from '@/components/landing-page/navbar/Navbar.vue';

    import HeroSection from './sections/hero-section.vue';
    import AboutSection from './sections/about-section.vue';
    import ServicesSection from './sections/services-section.vue';
    import ProjectsSection from './sections/projects-section.vue';
    import FeedbacksSection from './sections/feedbacks-section.vue'
</script>

<template>
    <main>
        <Navbar />

        <div class="content-wrapper"> 
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection />
            <FeedbacksSection />
        </div>
    </main>
</template>