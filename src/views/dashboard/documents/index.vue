<script setup lang="ts">
import { computed, ref } from "vue";
import { format } from "date-fns";
import { Eye, Download, Plus, Trash2, FolderOpen } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDocumentsQuery, useCategoriesQuery, useDeleteCategoryMutation, useDeleteDocumentMutation } from "@/queries/document";
import { useAuthStore } from "@/stores/auth";
import type { Document } from "@/types/document";
import DocumentFormDialog from "./DocumentFormDialog.vue";
import CategoryFormDialog from "./CategoryFormDialog.vue";

const authStore = useAuthStore();
const { data: documents, isLoading: loadingDocs } = useDocumentsQuery();
const { data: categories, isLoading: loadingCats } = useCategoriesQuery();
const { mutate: deleteCategory, isPending: deletingCat } = useDeleteCategoryMutation();
const { mutate: deleteDocument, isPending: deletingDoc } = useDeleteDocumentMutation();

const showDocForm = ref(false);
const showCatForm = ref(false);

const isLoading = computed(() => loadingDocs.value || loadingCats.value);

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
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Dokumen</h1>
        <p class="text-sm text-muted-foreground">Arsip dokumen tim dan asset</p>
      </div>
      <div class="flex items-center gap-2">
        <Button v-if="authStore.isFounder" variant="secondary" size="sm" class="gap-2" @click="showCatForm = true">
          <FolderOpen class="h-4 w-4" /> Tambah Kategori
        </Button>
        <Button v-if="authStore.isFounder" size="sm" class="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-sm" @click="showDocForm = true" :disabled="!categories?.length">
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
        <Button v-if="authStore.isFounder" variant="outline" size="sm" @click="showCatForm = true">Buat Kategori Pertama</Button>
      </div>
    </div>

    <div v-else class="animate-in fade-in space-y-8 duration-300">
      
      <!-- Loop through categories -->
      <div v-for="cat in categories" :key="cat.id" class="rounded-xl border bg-card overflow-hidden shadow-sm">
        <div class="flex items-center justify-between bg-muted/30 px-4 py-3 border-b">
          <h2 class="text-base font-semibold tracking-tight flex items-center gap-2">
            <FolderOpen class="h-4 w-4 text-primary" />
            {{ cat.name }}
          </h2>
          <Button v-if="authStore.isFounder" variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground hover:text-destructive" :disabled="deletingCat" @click="deleteCategory(cat.id)">
            <Trash2 class="h-4 w-4" />
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow class="hover:bg-transparent">
              <TableHead class="w-[30%]">Nama Dokumen</TableHead>
              <TableHead class="w-[30%]">Catatan</TableHead>
              <TableHead>Dibuat Oleh</TableHead>
              <TableHead class="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="doc in docsByCategory[cat.id]" :key="doc.id">
              <TableCell class="font-medium whitespace-nowrap">{{ doc.name }}</TableCell>
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
                  <Button v-if="authStore.isFounder" variant="ghost" size="sm" class="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" title="Hapus" :disabled="deletingDoc" @click="deleteDocument(doc.id)">
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow v-if="!docsByCategory[cat.id]?.length">
              <TableCell colspan="4" class="h-24 text-center text-muted-foreground">
                Belum ada dokumen di kategori ini.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </div>

    <DocumentFormDialog :open="showDocForm" @update:open="showDocForm = $event" />
    <CategoryFormDialog :open="showCatForm" @update:open="showCatForm = $event" />
  </div>
</template>
