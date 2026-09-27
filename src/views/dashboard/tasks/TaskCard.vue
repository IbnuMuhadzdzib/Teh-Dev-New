<script setup lang="ts">
import { ref, watch } from 'vue';
import { Pencil, Trash2, RefreshCw, PauseCircle, CheckCircle } from '@lucide/vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/queries/task';
import type { Task, TaskStatus } from '@/types/task';

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{ edit: [task: Task] }>();

const { mutate: update } = useUpdateTaskMutation();
const { mutate: remove, isPending: isDeleting } = useDeleteTaskMutation();

const confirmDelete = ref(false);

const statusMeta = {
  on_progress: { label: 'On Progress', color: 'bg-amber-500/15 text-amber-600 border-amber-500/20', icon: RefreshCw },
  on_hold: { label: 'On Hold', color: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20', icon: PauseCircle },
  completed: { label: 'Completed', color: 'bg-primary/15 text-primary border-primary/20', icon: CheckCircle },
};

function updateStatus(status: TaskStatus) {
  update({
    id: props.task.id,
    status,
    progress_percent: status === 'completed' ? 100 : props.task.progress_percent,
  });
}

function updateProgress(e: Event) {
  const value = Number((e.target as HTMLInputElement).value);
  update({ id: props.task.id, progress_percent: Math.min(100, Math.max(0, value)) });
}

function handleDelete() {
  if (!confirmDelete.value) {
    confirmDelete.value = true;
    return;
  }
  remove(props.task.id);
}

// auto-reset confirm
watch(confirmDelete, (v) => {
  if (v) setTimeout(() => (confirmDelete.value = false), 3000);
});
</script>

<template>
  <Card class="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:shadow-primary/5 border-border/60">
    <!-- Progress bar at top -->
    <div class="h-1 bg-muted">
      <div
        class="h-full bg-primary transition-all duration-500"
        :style="{ width: `${task.progress_percent}%` }"
      />
    </div>
    <CardContent class="flex flex-wrap items-center gap-4 p-4">
      <!-- Info -->
      <div class="min-w-0 flex-1">
        <p class="truncate font-semibold text-[15px]">{{ task.title }}</p>
        <p class="text-xs text-muted-foreground mt-0.5">
          {{ task.projects?.name ?? '—' }} · {{ task.assignee?.username }}
        </p>
        <p v-if="task.description" class="text-xs text-muted-foreground/70 mt-1 line-clamp-1">
          {{ task.description }}
        </p>
      </div>

      <!-- Progress input -->
      <div v-if="task.status === 'on_progress'" class="flex items-center gap-1.5">
        <Input
          type="number"
          min="0"
          max="100"
          :model-value="task.progress_percent"
          class="w-16 text-center text-sm h-8"
          @change="updateProgress"
        />
        <span class="text-xs text-muted-foreground">%</span>
      </div>

      <!-- Status -->
      <Select :model-value="task.status" @update:model-value="(v) => updateStatus(v as TaskStatus)">
        <SelectTrigger class="w-36 h-8 text-xs">
          <SelectValue>
            <Badge :class="statusMeta[task.status].color" class="font-medium text-[11px] border px-2 py-0.5 flex gap-1 items-center">
              <component :is="statusMeta[task.status].icon" class="h-3 w-3" />
              {{ statusMeta[task.status].label }}
            </Badge>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="on_progress"><span class="flex items-center gap-1.5"><RefreshCw class="h-3.5 w-3.5"/> On Progress</span></SelectItem>
          <SelectItem value="on_hold"><span class="flex items-center gap-1.5"><PauseCircle class="h-3.5 w-3.5"/> On Hold</span></SelectItem>
          <SelectItem value="completed"><span class="flex items-center gap-1.5"><CheckCircle class="h-3.5 w-3.5"/> Completed</span></SelectItem>
        </SelectContent>
      </Select>

      <!-- Actions -->
      <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-foreground" @click="emit('edit', task)">
          <Pencil class="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          :class="['h-8 w-8', confirmDelete ? 'text-destructive hover:text-destructive' : 'text-muted-foreground hover:text-destructive']"
          :disabled="isDeleting"
          @click="handleDelete"
        >
          <Trash2 class="h-3.5 w-3.5" />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>