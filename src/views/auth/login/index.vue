<script setup lang="ts">
import { ref } from 'vue';
import logo from '@/assets/images/tehdev.png';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useGlobalHelpers } from '@/composable/useGlobalHelpers';
import { useLoginMutation } from '@/queries/auth';
import { useAuthStore } from '@/stores/auth';

const username = ref('');
const password = ref('');

const authStore = useAuthStore();
const { goToName } = useGlobalHelpers();
const { mutate, isPending, error } = useLoginMutation();

function handleSubmit() {
  mutate(
    { username: username.value, password: password.value },
    {
      onSuccess: ({ session, profile }) => {
        if (session && profile) {
          authStore.userId = profile.id;
          authStore.username = profile.username;
          authStore.role = profile.role;
        }
        goToName('dashboard-projects');
      },
    },
  );
}
</script>

<template>
  <div class="flex min-h-svh items-center justify-center bg-linear-to-br from-emerald-50 via-background to-background p-4">
    <Card class="w-full max-w-sm shadow-lg">
      <CardHeader class="space-y-1 text-center">
        <img :src="logo" alt="Logo Tim" class="mx-auto mb-2 h-14 w-14" />
        <CardTitle class="text-xl">Masuk ke Dashboard</CardTitle>
        <CardDescription>Pakai akun yang sudah dibuatkan admin</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-1.5">
            <label class="text-sm font-medium" for="username">Username</label>
            <Input id="username" v-model="username" placeholder="username" autocomplete="username" required />
          </div>
          <div class="space-y-1.5">
            <label class="text-sm font-medium" for="password">Password</label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
          </div>
          <p v-if="error" class="text-sm text-destructive">{{ error.message }}</p>
          <Button type="submit" class="w-full transition-transform active:scale-[0.98]" :disabled="isPending">
            {{ isPending ? 'Memproses...' : 'Masuk' }}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>