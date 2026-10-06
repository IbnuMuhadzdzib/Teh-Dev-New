<script setup lang="ts">
    defineProps<{
        label: string;
    }>();
</script>

<template>
    <a href="#contact" class="bg-[#33B261] text-white px-8 py-2.5 rounded-full hover:bg-[#2A8C4B] transition-all">
        {{ label }}
    </a>
</template>