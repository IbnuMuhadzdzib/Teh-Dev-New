<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { FileText, LayoutGrid, ListTodo, Users } from '@lucide/vue';
import logo from '@/assets/images/tehdev.png';
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
    { name: 'dashboard-tasks', label: 'Tasks', icon: ListTodo },
    { name: 'dashboard-documents', label: 'Dokumen', icon: FileText },
  ];
  if (authStore.isFounder) items.push({ name: 'dashboard-users', label: 'User', icon: Users });
  return items;
});

async function handleLogout() {
  await authStore.logout();
  goToName('login');
}
</script>

<template>
  <div class="min-h-svh bg-[#F8F9FB] flex flex-col items-center">
    <!-- Top Nav Header -->
    <header class="w-full bg-white/70 backdrop-blur-xl border-b border-border/40 sticky top-0 z-50">
      <div class="mx-auto flex w-full max-w-350 items-center justify-between px-6 py-4">
        
        <!-- Logo -->
        <div class="flex items-center gap-3 min-w-50">
          <div class="p-1.5 bg-indigo-50 rounded-xl">
            <img :src="logo" alt="Logo" class="h-8 w-8 object-contain" />
          </div>
          <div>
            <span class="font-bold text-lg text-slate-800 leading-none block">Teh Dev</span>
            <span class="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Internal Dashboard</span>
          </div>
        </div>

        <!-- Pill Nav (Reference Image 1 style) -->
        <nav class="hidden md:flex items-center p-1 bg-slate-900 rounded-full shadow-sm">
          <Button
            v-for="item in navItems"
            :key="item.name"
            variant="ghost"
            class="h-9 px-6 rounded-full font-medium transition-all duration-300"
            :class="[
              route.name === item.name 
                ? 'bg-primary/90 text-primary-foreground shadow-md hover:bg-primary hover:text-primary-foreground' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            ]"
            @click="goToName(item.name)"
          >
            {{ item.label }}
          </Button>
        </nav>

        <!-- Right Side User Icons -->
        <div class="flex items-center gap-3 min-w-50 justify-end">
          <div class="flex items-center gap-2 pl-4">
            <!-- Avatar & Logout Dropdown (Simplified for now) -->
            <div class="hidden lg:block text-right">
              <p class="text-sm font-semibold text-slate-800 leading-none">{{ authStore.username || 'User' }}</p>
              <Badge variant="secondary" class="mt-1 font-bold text-[9px] uppercase tracking-wider text-primary bg-primary/10 border-0 h-4">
                {{ authStore.role || 'GUEST' }}
              </Badge>
            </div>
            
            <button class="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-border/50 transition-transform hover:scale-105 active:scale-95 bg-primary/10 flex items-center justify-center text-primary font-bold" @click="handleLogout" title="Logout">
              {{ authStore.username?.substring(0, 2).toUpperCase() || 'U' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Nav Scroll -->
      <nav class="flex md:hidden gap-2 overflow-x-auto px-4 py-3 bg-white border-t border-border/40 hide-scrollbar">
        <Button
          v-for="item in navItems"
          :key="item.name"
          variant="outline"
          size="sm"
          class="shrink-0 rounded-full border-border/50"
          :class="[
            route.name === item.name 
              ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground' 
              : 'text-muted-foreground'
          ]"
          @click="goToName(item.name)"
        >
          <component :is="item.icon" class="h-3.5 w-3.5 mr-2" />
          {{ item.label }}
        </Button>
      </nav>
    </header>

    <!-- Main Content Area -->
    <main class="w-full max-w-350 px-4 py-8 lg:px-8 pb-32">
      <router-view v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>