<script setup lang="ts">
    defineProps<{
        label: string;
    }>();
</script>

<template>
    <button class="bg-[#33B261] text-white px-8 py-2 rounded-md hover:bg-[#2A8C4B] transition-colors">
        {{ label }}
    </button>
</template>