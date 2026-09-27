<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCategoriesQuery, useCreateDocumentMutation, useUpdateDocumentMutation } from '@/queries/document';
import { useAuthStore } from '@/stores/auth';
import type { Document } from '@/types/document';

const props = defineProps<{ open: boolean; docToEdit?: Document | null }>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const authStore = useAuthStore();
const { mutate: createDoc, isPending: isCreating } = useCreateDocumentMutation(authStore.userId!);
const { mutate: updateDoc, isPending: isUpdating } = useUpdateDocumentMutation();
const isPending = computed(() => isCreating.value || isUpdating.value);
const { data: categories } = useCategoriesQuery();

const form = reactive({ category_id: '', name: '', link: '', note: '', priority: 'menengah' as any });

function reset() {
  Object.assign(form, { category_id: '', name: '', link: '', note: '', priority: 'menengah' });
}

watch(() => props.open, (isOpen) => {
  if (isOpen && props.docToEdit) {
    Object.assign(form, {
      category_id: props.docToEdit.category_id,
      name: props.docToEdit.name,
      link: props.docToEdit.link,
      note: props.docToEdit.note || '',
      priority: props.docToEdit.priority || 'menengah',
    });
  } else if (isOpen) {
    reset();
  }
});

function handleSubmit() {
  const onSuccess = () => {
    reset();
    emit('update:open', false);
  };
  
  if (props.docToEdit) {
    updateDoc({ id: props.docToEdit.id, ...form }, { onSuccess });
  } else {
    createDoc(form as any, { onSuccess });
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader><DialogTitle>{{ docToEdit ? 'Edit Dokumen' : 'Tambah Dokumen' }}</DialogTitle></DialogHeader>
      <form class="space-y-3 pt-1" @submit.prevent="handleSubmit">
        <Select v-model="form.category_id" required>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Kategori Dokumen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="form.priority" required>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Tingkat Kepentingan (Priority)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rendah">Rendah (Info Biasa)</SelectItem>
            <SelectItem value="menengah">Menengah (Standar)</SelectItem>
            <SelectItem value="tinggi">Tinggi (Sangat Penting / Standar Core)</SelectItem>
          </SelectContent>
        </Select>

        <Input v-model="form.name" placeholder="Judul dokumen" required />
        <Input v-model="form.link" type="url" placeholder="Link dokumen (gdrive, dll)" required />
        <Textarea v-model="form.note" placeholder="Catatan singkat (opsional)" rows="3" />
        
        <DialogFooter class="pt-2">
          <Button type="submit" :disabled="isPending" class="bg-primary hover:bg-primary/90 text-primary-foreground">
            {{ isPending ? 'Menyimpan...' : (docToEdit ? 'Update Dokumen' : 'Simpan Dokumen') }}
           </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>