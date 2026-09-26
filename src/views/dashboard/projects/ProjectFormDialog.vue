<script setup lang="ts">
import { reactive } from 'vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateProjectMutation } from '@/queries/projects';
import { useAuthStore } from '@/stores/auth';

defineProps<{ open: boolean }>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const authStore = useAuthStore();
const { mutate, isPending } = useCreateProjectMutation(authStore.userId!);

const form = reactive({
  name: '',
  description: '',
  preview_url: '',
  design_link: '',
  repo_link: '',
  contract_link: '',
  document_link: '',
});

function reset() {
  Object.assign(form, {
    name: '',
    description: '',
    preview_url: '',
    design_link: '',
    repo_link: '',
    contract_link: '',
    document_link: '',
  });
}

function handleSubmit() {
  mutate(form, {
    onSuccess: () => {
      reset();
      emit('update:open', false);
    },
  });
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader><DialogTitle>Tambah Project</DialogTitle></DialogHeader>
      <form class="space-y-3" @submit.prevent="handleSubmit">
        <Input v-model="form.name" placeholder="Nama project" required />
        <Textarea v-model="form.description" placeholder="Deskripsi singkat" rows="3" />
        <div class="grid grid-cols-2 gap-3">
          <Input v-model="form.preview_url" placeholder="Link preview" />
          <Input v-model="form.design_link" placeholder="Link design" />
          <Input v-model="form.repo_link" placeholder="Link repo" />
          <Input v-model="form.contract_link" placeholder="Link kontrak" />
        </div>
        <Input v-model="form.document_link" placeholder="Link dokumen" />
        <DialogFooter>
          <Button type="submit" :disabled="isPending">
            {{ isPending ? 'Menyimpan...' : 'Simpan Project' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>