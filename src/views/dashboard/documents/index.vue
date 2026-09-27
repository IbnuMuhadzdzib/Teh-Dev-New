<script setup lang="ts">
import { computed, ref } from "vue";
import { format } from "date-fns";
import { 
  Eye, Download, Plus, Trash2, FolderOpen, ArrowUp, ArrowDown, Pencil,
  ArrowUpCircle, MinusCircle, ArrowDownCircle
} from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDocumentsQuery, useCategoriesQuery, useDeleteCategoryMutation, useDeleteDocumentMutation, useUpdateCategoryMutation, useUpdateDocumentMutation } from "@/queries/document";
import { useAuthStore } from "@/stores/auth";
import type { Document, DocumentCategory } from "@/types/document";
import DocumentFormDialog from "./DocumentFormDialog.vue";
import CategoryFormDialog from "./CategoryFormDialog.vue";

const authStore = useAuthStore();
const { data: documents, isLoading: loadingDocs } = useDocumentsQuery();
const { data: categories, isLoading: loadingCats } = useCategoriesQuery();
const { mutate: deleteCategory, isPending: deletingCat } = useDeleteCategoryMutation();
const { mutate: updateCategory } = useUpdateCategoryMutation();
const { mutate: deleteDocument, isPending: deletingDoc } = useDeleteDocumentMutation();
const { mutate: updateDocument } = useUpdateDocumentMutation();

const showDocForm = ref(false);
const showCatForm = ref(false);
const docToEdit = ref<Document | null>(null);
const catToEdit = ref<DocumentCategory | null>(null);

const isLoading = computed(() => loadingDocs.value || loadingCats.value);

const priorityInfo = {
  tinggi: { icon: ArrowUpCircle, class: 'text-rose-500', label: 'Tinggi' },
  menengah: { icon: MinusCircle, class: 'text-amber-500', label: 'Menengah' },
  rendah: { icon: ArrowDownCircle, class: 'text-blue-500', label: 'Rendah' },
};

// Group documents by category ID
const docsByCategory = computed(() => {
  if (!documents.value || !categories.value) return {};
  
  const map: Record<string, Document[]> = {};
  categories.value.forEach(c => map[c.id] = []);
  
  documents.value.forEach(doc => {
    if (map[doc.category_id]) {
      map[doc.category_id].push(doc);
    } else {
      // For legacy docs without category or deleted category (orphan fallback)
      if (!map['un-categorised']) map['un-categorised'] = [];
      map['un-categorised'].push(doc);
    }
  });
  
  return map;
});

function previewDoc(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function handleAddCategory() {
  catToEdit.value = null;
  showCatForm.value = true;
}

function handleEditCategory(cat: DocumentCategory) {
  catToEdit.value = cat;
  showCatForm.value = true;
}

function handleAddDocument() {
  docToEdit.value = null;
  showDocForm.value = true;
}

function handleEditDocument(doc: Document) {
  docToEdit.value = doc;
  showDocForm.value = true;
}

function moveCategory(index: number, direction: -1 | 1) {
  if (!categories.value) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= categories.value.length) return;
  
  const current = categories.value[index];
  const target = categories.value[targetIndex];
  
  const currentOrder = current.sort_order || index * 10;
  const targetOrder = target.sort_order || targetIndex * 10;
  
  updateCategory({ id: current.id, sort_order: targetOrder });
  updateCategory({ id: target.id, sort_order: currentOrder });
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Dokumen</h1>
        <p class="text-sm text-muted-foreground">Arsip dokumen tim dan asset</p>
      </div>
      <div class="flex items-center gap-2">
        <Button v-if="authStore.isFounder" variant="secondary" size="sm" class="gap-2" @click="handleAddCategory">
          <FolderOpen class="h-4 w-4" /> Tambah Kategori
        </Button>
        <Button v-if="authStore.isFounder" size="sm" class="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-sm" @click="handleAddDocument" :disabled="!categories?.length">
          <Plus class="h-4 w-4" /> Dokumen Baru
        </Button>
      </div>
    </div>

    <div v-if="isLoading" class="space-y-6">
      <Skeleton v-for="i in 2" :key="i" class="h-48 rounded-xl" />
    </div>

    <div
      v-else-if="!categories?.length && !documents?.length"
      class="rounded-xl border border-dashed py-16 text-center"
    >
      <div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <FolderOpen class="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 class="mt-4 text-lg font-semibold">Belum ada Kategori</h3>
        <p class="mb-4 mt-2 text-sm text-muted-foreground">
          Founder harus membuat kategori terlebih dahulu sebelum dokumen dapat ditambahkan.
        </p>
        <Button v-if="authStore.isFounder" variant="outline" size="sm" @click="handleAddCategory">Buat Kategori Pertama</Button>
      </div>
    </div>

    <div v-else class="animate-in fade-in space-y-8 duration-300">
      
      <!-- Loop through categories -->
      <div v-for="(cat, idx) in categories" :key="cat.id" class="rounded-xl border bg-card overflow-hidden shadow-sm">
        <div class="flex items-center justify-between bg-muted/30 px-4 py-3 border-b">
          <h2 class="text-base font-semibold tracking-tight flex items-center gap-2">
            <FolderOpen class="h-4 w-4 text-primary" />
            {{ cat.name }}
          </h2>
          <div class="flex items-center gap-1">
            <template v-if="authStore.isFounder">
              <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-foreground" :disabled="idx === 0" @click="moveCategory(idx, -1)" title="Pindah ke Atas">
                <ArrowUp class="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-foreground" :disabled="idx === (categories?.length ?? 0) - 1" @click="moveCategory(idx, 1)" title="Pindah ke Bawah">
                <ArrowDown class="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-primary" @click="handleEditCategory(cat)" title="Edit">
                <Pencil class="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-destructive" :disabled="deletingCat" @click="deleteCategory(cat.id)" title="Hapus">
                <Trash2 class="h-4 w-4" />
              </Button>
            </template>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow class="hover:bg-transparent">
              <TableHead class="w-[35%]">Nama Dokumen</TableHead>
              <TableHead class="w-[20%]">Tingkat</TableHead>
              <TableHead class="w-[25%]">Catatan</TableHead>
              <TableHead>Dibuat Oleh</TableHead>
              <TableHead class="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="doc in docsByCategory[cat.id]" :key="doc.id">
              <TableCell class="font-medium whitespace-nowrap">{{ doc.name }}</TableCell>
              <TableCell>
                <Select v-if="authStore.isFounder" :model-value="doc.priority || 'menengah'" @update:model-value="val => updateDocument({ id: doc.id, priority: val as any })">
                  <SelectTrigger class="h-7 w-[120px] px-2 text-xs border-dashed bg-muted/20">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rendah">
                      <div class="flex items-center gap-2"><ArrowDownCircle class="h-3 w-3 text-blue-500" /> Rendah</div>
                    </SelectItem>
                    <SelectItem value="menengah">
                      <div class="flex items-center gap-2"><MinusCircle class="h-3 w-3 text-amber-500" /> Menengah</div>
                    </SelectItem>
                    <SelectItem value="tinggi">
                      <div class="flex items-center gap-2"><ArrowUpCircle class="h-3 w-3 text-rose-500" /> Tinggi</div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div v-else class="flex items-center gap-1.5 text-xs font-medium" :class="priorityInfo[(doc.priority || 'menengah') as keyof typeof priorityInfo].class">
                  <component :is="priorityInfo[(doc.priority || 'menengah') as keyof typeof priorityInfo].icon" class="h-3 w-3" />
                  {{ priorityInfo[(doc.priority || 'menengah') as keyof typeof priorityInfo].label }}
                </div>
              </TableCell>
              <TableCell class="text-muted-foreground text-sm max-w-[200px] truncate" :title="doc.note || ''">
                {{ doc.note || "-" }}
              </TableCell>
              <TableCell>
                <div class="text-sm">{{ doc.creator?.username ?? "-" }}</div>
                <div class="text-[10px] text-muted-foreground">{{ format(new Date(doc.created_at), "dd MMM yy") }}</div>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" class="h-8 w-8 p-0" title="Preview" @click="previewDoc(doc.link)">
                    <Eye class="h-4 w-4 text-primary" />
                  </Button>
                  <a :href="doc.link" download target="_blank" rel="noopener">
                    <Button variant="ghost" size="sm" class="h-8 w-8 p-0" title="Download">
                      <Download class="h-4 w-4" />
                    </Button>
                  </a>
                  <template v-if="authStore.isFounder">
                    <Button variant="ghost" size="sm" class="h-8 w-8 p-0 text-muted-foreground hover:text-primary" title="Edit" @click="handleEditDocument(doc)">
                      <Pencil class="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" class="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" title="Hapus" :disabled="deletingDoc" @click="deleteDocument(doc.id)">
                      <Trash2 class="h-4 w-4" />
                    </Button>
                  </template>
                </div>
              </TableCell>
            </TableRow>
            <TableRow v-if="!docsByCategory[cat.id]?.length">
              <TableCell colspan="5" class="h-24 text-center text-muted-foreground">
                Belum ada dokumen di kategori ini.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </div>

    <DocumentFormDialog :open="showDocForm" :docToEdit="docToEdit" @update:open="showDocForm = $event" />
    <CategoryFormDialog :open="showCatForm" :catToEdit="catToEdit" @update:open="showCatForm = $event" />
  </div>
</template>
