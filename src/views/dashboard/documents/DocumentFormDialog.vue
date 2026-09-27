<script setup lang="ts">
import { reactive } from 'vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCategoriesQuery, useCreateDocumentMutation } from '@/queries/document';
import { useAuthStore } from '@/stores/auth';

defineProps<{ open: boolean }>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const authStore = useAuthStore();
const { mutate, isPending } = useCreateDocumentMutation(authStore.userId!);
const { data: categories } = useCategoriesQuery();

const form = reactive({ category_id: '', name: '', link: '', note: '' });

function reset() {
  Object.assign(form, { category_id: '', name: '', link: '', note: '' });
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

        <Input v-model="form.name" placeholder="Judul dokumen" required />
        <Input v-model="form.link" type="url" placeholder="Link dokumen (gdrive, dll)" required />
        <Textarea v-model="form.note" placeholder="Catatan singkat (opsional)" rows="3" />
        
        <DialogFooter class="pt-2">
          <Button type="submit" :disabled="isPending" class="bg-primary hover:bg-primary/90 text-primary-foreground">
            {{ isPending ? 'Menyimpan...' : 'Simpan Dokumen' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>