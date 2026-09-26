<script setup lang="ts">
import { computed, reactive } from 'vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateTaskMutation } from '@/queries/task';
import { useUsersQuery } from '@/queries/user';
import { useAuthStore } from '@/stores/auth';
import type { Project } from '@/types/projects';

const props = defineProps<{ open: boolean; projects: Project[] }>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const authStore = useAuthStore();
const canAssignOthers = computed(() => authStore.canAssignTask);
const { data: users } = useUsersQuery(canAssignOthers);
const { mutate, isPending } = useCreateTaskMutation();

const form = reactive({
  project_id: '',
  title: '',
  description: '',
  assigned_to: authStore.userId ?? '',
});

function reset() {
  Object.assign(form, { project_id: '', title: '', description: '', assigned_to: authStore.userId ?? '' });
}

function handleSubmit() {
  mutate(
    { ...form, assigned_by: authStore.userId! },
    {
      onSuccess: () => {
        reset();
        emit('update:open', false);
      },
    },
  );
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader><DialogTitle>Tambah Task</DialogTitle></DialogHeader>
      <form class="space-y-3" @submit.prevent="handleSubmit">
        <Select v-model="form.project_id">
          <SelectTrigger><SelectValue placeholder="Pilih project" /></SelectTrigger>
          <SelectContent>
            <SelectItem v-for="p in props.projects" :key="p.id" :value="p.id">{{ p.name }}</SelectItem>
          </SelectContent>
        </Select>

        <Input v-model="form.title" placeholder="Judul task" required />
        <Textarea v-model="form.description" placeholder="Deskripsi (opsional)" rows="3" />

        <Select v-if="canAssignOthers" v-model="form.assigned_to">
          <SelectTrigger><SelectValue placeholder="Assign ke" /></SelectTrigger>
          <SelectContent>
            <SelectItem v-for="u in users" :key="u.id" :value="u.id">{{ u.username }}</SelectItem>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button type="submit" :disabled="isPending">
            {{ isPending ? 'Menyimpan...' : 'Simpan Task' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>