<script setup lang="ts">
import { computed } from 'vue';
import { BadgeCheck, ExternalLink } from '@lucide/vue';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types/projects';

const props = defineProps<{ project: Project }>();
const emit = defineEmits<{ click: [] }>();

// Simple hash to grab a pseudo-random image for a project just for visual appeal if we want
// But for now, just an elegant gradient block as placeholder
const gradientTheme = computed(() => {
  const themes = [
    'from-indigo-100 to-indigo-50/50',
    'from-purple-100 to-purple-50/50',
    'from-emerald-100 to-emerald-50/50',
    'from-blue-100 to-blue-50/50',
    'from-rose-100 to-rose-50/50',
  ];
  return themes[(props.project.name.length || 0) % themes.length];
});

const isVerified = computed(() => props.project.status === 'active');
</script>

<template>
  <Card
    class="group relative overflow-hidden cursor-pointer rounded-[24px] border border-border/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 bg-background"
    @click="$emit('click')"
  >
    <!-- Top Image/Preview Block -->
    <div 
      class="h-[200px] w-full p-3 transition-transform duration-500 group-hover:scale-[1.02]"
    >
      <div 
        class="h-full w-full rounded-2xl bg-gradient-to-b relative overflow-hidden"
        :class="gradientTheme"
      >
        <!-- Mock UI inside the preview area just to make it look premium -->
        <div class="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
        <div class="absolute top-4 left-4 right-4 flex gap-2 pt-2">
          <div class="h-8 w-8 rounded-full bg-white/40 shadow-sm"></div>
          <div class="space-y-1.5 flex-1 pt-1 mt-1">
             <div class="h-2 w-1/3 rounded-full bg-white/60"></div>
             <div class="h-2 w-1/4 rounded-full bg-white/40"></div>
          </div>
        </div>
        <div class="absolute bottom-4 left-4 right-4 h-24 rounded-xl bg-white/40 shadow-sm"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 pt-2">
      <!-- Title row with verified badge -->
      <div class="flex items-center gap-1.5">
        <h3 class="text-[17px] font-semibold text-foreground tracking-tight line-clamp-1">
          {{ project.name }}
        </h3>
        <BadgeCheck 
          v-if="isVerified" 
          class="h-4 w-4 text-emerald-500 shrink-0" 
          stroke-width="2.5" 
        />
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted-foreground shrink-0"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/></svg>
      </div>

      <!-- Description -->
      <p class="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {{ project.description || 'Proyek belum memiliki deskripsi. Buka untuk mengelola tautan dan arsip dokumen.' }}
      </p>

      <!-- Bottom Action -->
      <div class="mt-6 flex justify-end">
        <Button 
          variant="secondary" 
          class="h-9 px-4 rounded-full text-xs font-semibold gap-1.5 transition-colors group-hover:bg-primary group-hover:text-primary-foreground pointer-events-none"
        >
          Buka <ExternalLink class="h-3 w-3" />
        </Button>
      </div>
    </div>
  </Card>
</template>