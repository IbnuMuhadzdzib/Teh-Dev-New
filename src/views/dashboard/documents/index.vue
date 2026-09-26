<script setup lang="ts">
import { ref } from "vue";
import { format } from "date-fns";
import { Download, Plus } from "@lucide/vue";
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
import { useDocumentsQuery } from "@/queries/document";
import { useAuthStore } from "@/stores/auth";
import DocumentFormDialog from "../documents//DocumentFormDialog.vue";

const authStore = useAuthStore();
const { data: documents, isLoading } = useDocumentsQuery();
const showForm = ref(false);
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Dokumen</h1>
        <p class="text-sm text-muted-foreground">Arsip dokumen tim</p>
      </div>
      <Button v-if="authStore.isFounder" class="gap-2" @click="showForm = true">
        <Plus class="h-4 w-4" /> Tambah Dokumen
      </Button>
    </div>

    <Skeleton v-if="isLoading" class="h-64 rounded-xl" />

    <div
      v-else
      class="animate-in fade-in overflow-hidden rounded-xl border duration-300"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Catatan</TableHead>
            <TableHead>Dibuat Oleh</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead class="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="doc in documents" :key="doc.id">
            <TableCell class="font-medium">{{ doc.name }}</TableCell>
            <TableCell class="text-muted-foreground">{{
              doc.note || "-"
            }}</TableCell>
            <TableCell>{{ doc.creator?.username ?? "-" }}</TableCell>
            <TableCell>{{
              format(new Date(doc.created_at), "dd MMM yyyy")
            }}</TableCell>
            <TableCell class="text-right">
              <a :href="doc.link" download target="_blank" rel="noopener">
                <Button variant="outline" size="sm" class="gap-1.5">
                  <Download class="h-3.5 w-3.5" /> Download
                </Button>
              </a>
            </TableCell>
          </TableRow>
          <TableRow v-if="!documents?.length">
            <TableCell
              colspan="5"
              class="py-10 text-center text-muted-foreground"
            >
              Belum ada dokumen.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DocumentFormDialog v-model:open="showForm" />
  </div>
</template>
