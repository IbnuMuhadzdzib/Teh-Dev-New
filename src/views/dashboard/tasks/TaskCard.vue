<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateTaskMutation } from '@/queries/task';
import type { Task, TaskStatus } from '@/types/task';

const props = defineProps<{ task: Task }>();
const { mutate } = useUpdateTaskMutation();

const statusColor: Record<TaskStatus, string> = {
  on_progress: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  on_hold: 'bg-muted text-muted-foreground hover:bg-muted',
  completed: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
};

const statusLabel: Record<TaskStatus, string> = {
  on_progress: 'On Progress',
  on_hold: 'On Hold',
  completed: 'Completed',
};

function updateStatus(status: TaskStatus) {
  mutate({
    id: props.task.id,
    status,
    progress_percent: status === 'completed' ? 100 : props.task.progress_percent,
  });
}

function updateProgress(e: Event) {
  const value = Number((e.target as HTMLInputElement).value);
  mutate({ id: props.task.id, progress_percent: Math.min(100, Math.max(0, value)) });
}
</script>

<template>
  <Card>
    <CardContent class="flex flex-wrap items-center gap-4 py-4">
      <div class="min-w-0 flex-1">
        <p class="truncate font-medium">{{ task.title }}</p>
        <p class="text-xs text-muted-foreground">
          {{ task.projects?.name ?? '—' }} · {{ task.assignee?.username }}
        </p>
      </div>

      <Input
        v-if="task.status === 'on_progress'"
        type="number"
        min="0"
        max="100"
        :model-value="task.progress_percent"
        class="w-20"
        @change="updateProgress"
      />

      <Select :model-value="task.status" @update:model-value="(v) => updateStatus(v as TaskStatus)">
        <SelectTrigger class="w-40">
          <SelectValue>
            <Badge :class="statusColor[task.status]" class="font-normal">
              {{ statusLabel[task.status] }}
            </Badge>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="on_progress">On Progress</SelectItem>
          <SelectItem value="on_hold">On Hold</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </CardContent>
  </Card>
</template>