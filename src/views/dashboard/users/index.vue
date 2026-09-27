<script setup lang="ts">
import { ref } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUpdateUserRoleMutation, useUsersQuery } from "@/queries/user";
import type { UserRole } from "@/types/auth";

const enabled = ref(true);
const { data: users, isLoading } = useUsersQuery(enabled);
const { mutate } = useUpdateUserRoleMutation();

const roleOptions: UserRole[] = [
  "developer",
  "designer",
  "pm",
  "pl",
  "founder",
];
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">Manajemen User</h1>
      <p class="text-sm text-muted-foreground">Atur role tiap anggota tim</p>
    </div>

    <Skeleton v-if="isLoading" class="h-64 rounded-xl" />

    <div
      v-else
      class="animate-in fade-in overflow-hidden rounded-xl border duration-300"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="u in users" :key="u.id">
            <TableCell class="font-medium">{{ u.username }}</TableCell>
            <TableCell>
              <Select
                :model-value="u.role"
                @update:model-value="
                  (v) => mutate({ userId: u.id, role: v as UserRole })
                "
              >
                <SelectTrigger class="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="r in roleOptions" :key="r" :value="r">{{
                    r
                  }}</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
