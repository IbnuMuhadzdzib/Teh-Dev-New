<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types/projects';

defineProps<{ project: Project }>();
defineEmits<{ click: [] }>();
</script>

<template>
  <Card
    class="cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
    @click="$emit('click')"
  >
    <CardHeader>
      <div class="flex items-start justify-between gap-2">
        <CardTitle class="line-clamp-1">{{ project.name }}</CardTitle>
        <Badge :variant="project.status === 'active' ? 'default' : 'secondary'" class="shrink-0">
          {{ project.status }}
        </Badge>
      </div>
      <CardDescription class="line-clamp-2">
        {{ project.description || 'Belum ada deskripsi.' }}
      </CardDescription>
    </CardHeader>
    <CardFooter class="text-xs text-muted-foreground">Klik untuk lihat detail & arsip</CardFooter>
  </Card>
</template>