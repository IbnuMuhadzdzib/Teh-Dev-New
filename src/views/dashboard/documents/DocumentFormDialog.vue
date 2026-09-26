<script setup lang="ts">
import { reactive } from 'vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateDocumentMutation } from '@/queries/document';
import { useAuthStore } from '@/stores/auth';

defineProps<{ open: boolean }>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const authStore = useAuthStore();
const { mutate, isPending } = useCreateDocumentMutation(authStore.userId!);

const form = reactive({ name: '', link: '', note: '' });

function reset() {
  Object.assign(form, { name: '', link: '', note: '' });
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
    <DialogContent class="sm:max-w-md">
      <DialogHeader><DialogTitle>Tambah Dokumen</DialogTitle></DialogHeader>
      <form class="space-y-3" @submit.prevent="handleSubmit">
        <Input v-model="form.name" placeholder="Nama dokumen" required />
        <Input v-model="form.link" placeholder="Link dokumen" required />
        <Textarea v-model="form.note" placeholder="Catatan (opsional)" rows="3" />
        <DialogFooter>
          <Button type="submit" :disabled="isPending">
            {{ isPending ? 'Menyimpan...' : 'Simpan Dokumen' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>