<script setup lang="ts">
import { computed, ref } from "vue";
import { Plus } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectsQuery } from "@/queries/projects";
import { useAllTasksQuery, useMyTasksQuery } from "@/queries/task";
import { useAuthStore } from "@/stores/auth";
import TaskCard from "./TaskCard.vue";
import TaskFormDialog from "./TaskFormDialog.vue";

const authStore = useAuthStore();
const userId = computed(() => authStore.userId ?? "");
const canSeeAll = computed(() => authStore.canAssignTask);

const { data: myTasks, isLoading: loadingMine } = useMyTasksQuery(userId);
const { data: allTasks, isLoading: loadingAll } = useAllTasksQuery(canSeeAll);
const { data: projects } = useProjectsQuery();

const tasks = computed(
  () => (canSeeAll.value ? allTasks.value : myTasks.value) ?? [],
);
const isLoading = computed(() =>
  canSeeAll.value ? loadingAll.value : loadingMine.value,
);

const showForm = ref(false);
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Task</h1>
        <p class="text-sm text-muted-foreground">
          {{ canSeeAll ? "Semua task tim" : "Task yang ditugaskan ke kamu" }}
        </p>
      </div>
      <Button class="gap-2" @click="showForm = true">
        <Plus class="h-4 w-4" /> Tambah Task
      </Button>
    </div>

    <div v-if="isLoading" class="space-y-3">
      <Skeleton v-for="i in 4" :key="i" class="h-20 rounded-xl" />
    </div>

    <div
      v-else-if="!tasks.length"
      class="rounded-xl border border-dashed py-16 text-center text-muted-foreground"
    >
      Belum ada task.
    </div>

    <div v-else class="animate-in fade-in space-y-3 duration-300">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </div>

    <TaskFormDialog v-model:open="showForm" :projects="projects ?? []" />
  </div>
</template>
