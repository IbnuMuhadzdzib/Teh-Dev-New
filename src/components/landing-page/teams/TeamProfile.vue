<script setup lang="ts">
defineProps<{
  href: string;
}>();
</script>

<template>
    <a :href="href" target="_blank" rel="noopener noreferrer" title="Profile Linkedin" class="bg-[#DEFFEA] text-[#33B261]">
        <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-8 w-8" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.93 2.06 2.06 0 1.14-.92 2.07-2.06 2.07zM7.12 20.45H3.56V9h3.56v11.45z"/>
    </svg>
    </a>
</template>
