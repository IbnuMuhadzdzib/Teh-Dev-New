<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '@/queries/document';
import { useAuthStore } from '@/stores/auth';
import type { DocumentCategory } from '@/types/document';

const props = defineProps<{ open: boolean; catToEdit?: DocumentCategory | null }>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const authStore = useAuthStore();
const { mutate: createCat, isPending: isCreating } = useCreateCategoryMutation(authStore.userId!);
const { mutate: updateCat, isPending: isUpdating } = useUpdateCategoryMutation();

const isPending = computed(() => isCreating.value || isUpdating.value);

const form = reactive({ name: '' });

watch(() => props.open, (isOpen) => {
  if (isOpen && props.catToEdit) {
    form.name = props.catToEdit.name;
  } else if (isOpen) {
    reset();
  }
});

function reset() {
  form.name = '';
}

function handleSubmit() {
  const onSuccess = () => {
    reset();
    emit('update:open', false);
  };
  
  if (props.catToEdit) {
    updateCat({ id: props.catToEdit.id, name: form.name }, { onSuccess });
  } else {
    createCat(form, { onSuccess });
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-sm">
      <DialogHeader><DialogTitle>{{ catToEdit ? 'Edit Kategori' : 'Tambah Kategori Table' }}</DialogTitle></DialogHeader>
      <form class="space-y-4 pt-2" @submit.prevent="handleSubmit">
        <Input v-model="form.name" placeholder="Nama Kategori (mis: Table Dokumen RBB)" required />
        <DialogFooter>
          <Button type="submit" :disabled="isPending" class="bg-primary hover:bg-primary/90 text-primary-foreground">
            {{ isPending ? 'Menyimpan...' : (catToEdit ? 'Update Kategori' : 'Simpan Kategori') }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
