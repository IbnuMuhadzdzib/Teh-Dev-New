<script setup lang="ts">
import { reactive } from 'vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateCategoryMutation } from '@/queries/document';
import { useAuthStore } from '@/stores/auth';

defineProps<{ open: boolean }>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const authStore = useAuthStore();
const { mutate, isPending } = useCreateCategoryMutation(authStore.userId!);

const form = reactive({ name: '' });

function reset() {
  form.name = '';
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
    <DialogContent class="sm:max-w-sm">
      <DialogHeader><DialogTitle>Tambah Kategori Table</DialogTitle></DialogHeader>
      <form class="space-y-4 pt-2" @submit.prevent="handleSubmit">
        <Input v-model="form.name" placeholder="Nama Kategori (mis: Table Dokumen RBB)" required />
        <DialogFooter>
          <Button type="submit" :disabled="isPending" class="bg-primary hover:bg-primary/90 text-primary-foreground">
            {{ isPending ? 'Menyimpan...' : 'Simpan Kategori' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
