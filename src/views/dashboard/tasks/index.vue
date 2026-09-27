<script setup lang="ts">
import { computed, ref } from "vue";
import { format, isSameDay } from "date-fns";
import { Copy, Plus, CalendarIcon } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useProjectsQuery } from "@/queries/projects";
import { useAllTasksQuery, useMyTasksQuery } from "@/queries/task";
import { useAuthStore } from "@/stores/auth";
import type { Task } from "@/types/task";
import TaskCard from "./TaskCard.vue";
import TaskFormDialog from "./TaskFormDialog.vue";

const authStore = useAuthStore();
const userId = computed(() => authStore.userId ?? "");
const canSeeAll = computed(() => authStore.canAssignTask);

const { data: myTasks, isLoading: loadingMine } = useMyTasksQuery(userId);
const { data: allTasks, isLoading: loadingAll } = useAllTasksQuery(canSeeAll);
const { data: projects } = useProjectsQuery();

// Date filtering logic
const selectedDateString = ref(format(new Date(), 'yyyy-MM-dd'));
const selectedDate = computed(() => new Date(selectedDateString.value));

const tasks = computed(() => (canSeeAll.value ? allTasks.value : myTasks.value) ?? []);

const filteredTasks = computed(() => {
  return tasks.value.filter((t) => {
    return isSameDay(new Date(t.created_at), selectedDate.value);
  });
});

const isLoading = computed(() =>
  canSeeAll.value ? loadingAll.value : loadingMine.value,
);

const showForm = ref(false);
const editingTask = ref<Task | null>(null);

function handleEdit(task: Task) {
  editingTask.value = task;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  setTimeout(() => {
    editingTask.value = null; // Clear edit state after dialog closes
  }, 200);
}

const copyButtonText = ref("Copy Laporan");
function copyLaporan() {
  if (!filteredTasks.value.length) return;

  const dateFormatted = format(selectedDate.value, 'dd MMM yyyy');
  let report = `📋 *Laporan Task — ${dateFormatted}*\n\n`;

  const completed = filteredTasks.value.filter(t => t.status === 'completed');
  const onProgress = filteredTasks.value.filter(t => t.status === 'on_progress');
  const onHold = filteredTasks.value.filter(t => t.status === 'on_hold');

  if (completed.length) {
    completed.forEach(t => report += `✅ ${t.title} — Completed\n`);
    report += '\n';
  }
  if (onProgress.length) {
    onProgress.forEach(t => report += `🔄 ${t.title} — On Progress (${t.progress_percent || 0}%)\n`);
    report += '\n';
  }
  if (onHold.length) {
    onHold.forEach(t => report += `⏸️ ${t.title} — On Hold\n`);
  }

  navigator.clipboard.writeText(report.trim()).then(() => {
    copyButtonText.value = "Tersalin!";
    setTimeout(() => {
      copyButtonText.value = "Copy Laporan";
    }, 2000);
  });
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-foreground">Task</h1>
        <p class="text-sm text-muted-foreground">
          {{ canSeeAll ? "Pantau progress task tim" : "Task yang ditugaskan ke kamu" }}
        </p>
      </div>
      
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative max-w-40">
          <CalendarIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="date" 
            v-model="selectedDateString" 
            class="pl-9 h-9" 
          />
        </div>
        
        <Button variant="secondary" size="sm" class="gap-2 h-9" @click="copyLaporan" :disabled="!filteredTasks.length">
          <Copy class="h-3.5 w-3.5" /> {{ copyButtonText }}
        </Button>
        <Button size="sm" class="gap-2 h-9 bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-sm" @click="showForm = true">
          <Plus class="h-4 w-4" /> Baru
        </Button>
      </div>
    </div>

    <div v-if="isLoading" class="space-y-3">
      <Skeleton v-for="i in 4" :key="i" class="h-25 rounded-xl" />
    </div>

    <div
      v-else-if="!filteredTasks.length"
      class="rounded-xl border border-dashed py-16 text-center"
    >
      <div class="mx-auto flex max-w-105 flex-col items-center justify-center text-center">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <ListTodo class="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 class="mt-4 text-lg font-semibold">Belum ada task</h3>
        <p class="mb-4 mt-2 text-sm text-muted-foreground">
          Tidak ada task yang ditemukan untuk tanggal terpilih ({{ format(selectedDate, 'dd MMM yyyy') }}).
        </p>
        <Button variant="outline" size="sm" @click="showForm = true">Buat Task Baru</Button>
      </div>
    </div>

    <div v-else class="animate-in fade-in space-y-3 duration-300">
      <TaskCard 
        v-for="task in filteredTasks" 
        :key="task.id" 
        :task="task" 
        @edit="handleEdit" 
      />
    </div>

    <TaskFormDialog 
      :open="showForm" 
      @update:open="!$event && closeForm()" 
      :projects="projects ?? []" 
      :edit-task="editingTask" 
    />
  </div>
</template>

<script lang="ts">
import { ListTodo } from "@lucide/vue";
</script>
