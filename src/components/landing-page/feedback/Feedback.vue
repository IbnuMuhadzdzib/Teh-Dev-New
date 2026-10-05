<script setup lang="ts">
    import FeedbackImage from './FeedbackImage.vue';
    import FeedbackName from './FeedbackName.vue';
    import FeedbackRole from './FeedbackRole.vue';
    import FeedbackWord from './FeedbackWord.vue';

    defineProps<{
        alt: string;
        src: string;
        word: string;
        role: string;
        name: string;
    }>();
</script>

<template>
    <section>
        <div class="border border-gray-200 rounded-xl p-4 max-w-md space-y-8">
            <FeedbackWord class="text-[#717680]">{{ word }}</FeedbackWord>
            <div class="flex gap-4">
                <FeedbackImage :src="src" :alt="alt" class="w-12 h-12 rounded-lg"/>
                <div>
                    <FeedbackName>{{ name }}</FeedbackName>
                    <FeedbackRole class="text-sm text-[#717680] max-w-xs">{{ role }}</FeedbackRole>
                </div>
            </div>
        </div>
    </section>
</template>