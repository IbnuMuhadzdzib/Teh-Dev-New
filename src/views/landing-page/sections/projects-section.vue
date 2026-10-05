<script setup lang="ts">
    import Project from '@/components/landing-page/project/Project.vue';

    import SampleImage from '@/assets/images/sample/sample-1.png';

    const projectsData = [
        {
            title: 'Project 1',
            tag: 'Website',
            description: 'when your heart is broken baby, darkness on the edge of town',
            image: SampleImage,
            slug: 'project-sample'
        },
        {
            title: 'Project 1',
            tag: 'Website',
            description: 'when your heart is broken baby, darkness on the edge of town',
            image: SampleImage,
            slug: 'project-sample'
        },
    ];
</script>

<template>
  <section>
    <div>
      <h2 class="text-3xl font-bold text-center mb-20 text-gray-800">
        Project Kami
      </h2>
    </div>

    <div class="flex gap-20 w-full justify-center items-center">
        <Project 
            v-for="item in projectsData" 
            :key="item.slug"
            :title="item.title"
            :description="item.description"
            :imageSrc="item.image"
            :imageAlt="item.title"
            :tag="item.tag"
            :slug="item.slug"
        />
    </div>
  </section>
</template>
