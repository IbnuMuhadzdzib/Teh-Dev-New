<script setup lang="ts">
import { ExternalLink } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/types/projects";

const props = defineProps<{ open: boolean; project: Project | null }>();
defineEmits<{ "update:open": [value: boolean] }>();

function links(p: Project) {
  return [
    { label: "Preview", url: p.preview_url },
    { label: "Design", url: p.design_link },
    { label: "Repository", url: p.repo_link },
    { label: "Kontrak", url: p.contract_link },
    { label: "Dokumen", url: p.document_link },
  ].filter((l): l is { label: string; url: string } => !!l.url);
}
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent v-if="props.project" class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{{ props.project.name }}</DialogTitle>
        <DialogDescription>{{
          props.project.description || "Belum ada deskripsi."
        }}</DialogDescription>
      </DialogHeader>
      <div class="grid gap-2">
        <a
          v-for="link in links(props.project)"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener"
        >
          <Button variant="outline" class="w-full justify-between">
            {{ link.label }} <ExternalLink class="h-4 w-4" />
          </Button>
        </a>
        <p
          v-if="!links(props.project).length"
          class="text-sm text-muted-foreground"
        >
          Belum ada tautan arsip.
        </p>
      </div>
    </DialogContent>
  </Dialog>
</template>
