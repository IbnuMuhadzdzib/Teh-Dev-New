<script setup lang="ts">
import { ref } from "vue";
import { Plus } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectsQuery } from "@/queries/projects";
import { useAuthStore } from "@/stores/auth";
import type { Project } from "@/types/projects";
import ProjectCard from "./ProjectCard.vue";
import ProjectDetailDialog from "./ProjectDetailDialog.vue";
import ProjectFormDialog from "./ProjectFormDialog.vue";

const authStore = useAuthStore();
const { data: projects, isLoading } = useProjectsQuery();

const selectedProject = ref<Project | null>(null);
const showDetail = ref(false);
const showForm = ref(false);

function openDetail(project: Project) {
  selectedProject.value = project;
  showDetail.value = true;
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Projects</h1>
        <p class="text-sm text-muted-foreground">
          Semua project yang sedang berjalan
        </p>
      </div>
      <Button v-if="authStore.isFounder" class="gap-2" @click="showForm = true">
        <Plus class="h-4 w-4" /> Tambah Project
      </Button>
    </div>

    <div v-if="isLoading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Skeleton v-for="i in 6" :key="i" class="h-40 rounded-xl" />
    </div>

    <div
      v-else-if="!projects?.length"
      class="rounded-xl border border-dashed py-16 text-center text-muted-foreground"
    >
      Belum ada project.
    </div>

    <div
      v-else
      class="grid animate-in fade-in duration-300 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @click="openDetail(project)"
      />
    </div>

    <ProjectDetailDialog v-model:open="showDetail" :project="selectedProject" />
    <ProjectFormDialog v-model:open="showForm" />
  </div>
</template>
