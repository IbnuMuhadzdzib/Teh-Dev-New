<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { FileText, LayoutGrid, ListTodo, LogOut, Users } from '@lucide/vue';
import logo from '@/assets/tehdev.png';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGlobalHelpers } from '@/composable/useGlobalHelpers';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const authStore = useAuthStore();
const { goToName } = useGlobalHelpers();

const navItems = computed(() => {
  const items = [
    { name: 'dashboard-projects', label: 'Projects', icon: LayoutGrid },
    { name: 'dashboard-tasks', label: 'Task', icon: ListTodo },
    { name: 'dashboard-documents', label: 'Dokumen', icon: FileText },
  ];
  if (authStore.isFounder) items.push({ name: 'dashboard-users', label: 'User', icon: Users });
  return items;
});

function handleLogout() {
  authStore.logout();
  goToName('login');
}
</script>

<template>
  <div class="min-h-svh bg-muted/30">
    <header class="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div class="flex items-center gap-2">
          <img :src="logo" alt="Logo Tim" class="h-8 w-8" />
          <span class="font-semibold">Dashboard Tim</span>
        </div>

        <nav class="hidden gap-1 sm:flex">
          <Button
            v-for="item in navItems"
            :key="item.name"
            variant="ghost"
            size="sm"
            :class="[
              'gap-2 transition-colors',
              route.name === item.name && 'bg-emerald-600/10 text-emerald-700',
            ]"
            @click="goToName(item.name)"
          >
            <component :is="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </Button>
        </nav>

        <div class="flex items-center gap-3">
          <div class="hidden text-right sm:block">
            <p class="text-sm font-medium leading-none">{{ authStore.username }}</p>
            <Badge variant="secondary" class="mt-1 text-[10px]">{{ authStore.role }}</Badge>
          </div>
          <Button variant="outline" size="icon" @click="handleLogout">
            <LogOut class="h-4 w-4" />
          </Button>
        </div>
      </div>

      <nav class="flex gap-1 overflow-x-auto border-t px-4 py-2 sm:hidden">
        <Button
          v-for="item in navItems"
          :key="item.name"
          variant="ghost"
          size="sm"
          :class="['shrink-0 gap-2', route.name === item.name && 'bg-emerald-600/10 text-emerald-700']"
          @click="goToName(item.name)"
        >
          <component :is="item.icon" class="h-4 w-4" />
          {{ item.label }}
        </Button>
      </nav>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-6">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>