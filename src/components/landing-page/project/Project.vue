<script setup lang="ts">
    import ProjectTitle from './ProjectTitle.vue';
    import ProjectDesc from './ProjectDesc.vue';
    import ProjectImage from './ProjectImage.vue';
    import ProjectTag from './ProjectTag.vue';
    import ProjectButton from './ProjectButton.vue';

    defineProps<{
            title: string;
            description: string;
            imageSrc: string;
            imageAlt: string;
            tag: string;
            slug: string;
    }>();
</script>

<template>
    <section class="">
        <div class="font-sf space-y-6">
            <ProjectImage :src="imageSrc" :alt="imageAlt" class="max-w-lg bg-[#F5F5F5] py-8 px-24 rounded-md" />
            <div>
                <div class="flex gap-2 items-center">
                    <ProjectTitle class="font-medium text-xl">{{ title }}</ProjectTitle>
                    <ProjectTag class="flex text-sm gap-2 text-[#33B261]"><span class="font-bold">&middot;</span> {{ tag }}</ProjectTag>
                </div>
                <ProjectDesc class="text-[#717680]">{{ description }}</ProjectDesc>
            </div>
            <ProjectButton class="bg-[#33B261] py-2 px-4 text-white rounded-sm shadow-md" :slug="slug" />
        </div>
    </section>
</template>