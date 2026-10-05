<script setup lang="ts">
    import ToolsTitle from './ToolsTitle.vue';
    import ToolsDesc from './ToolsDesc.vue';
    import ToolsIcon from './ToolsIcon.vue';

    const toolsData = [
        {
            title: 'Frontend Development',
            description: 'Kami menggunakan teknologi frontend modern untuk membangun antarmuka pengguna yang responsif dan menarik.',
            icon: '',
        },
        {
            title: 'Backend Development',
            description: 'Tim backend kami mengembangkan API yang kuat dan aman untuk mendukung aplikasi Anda.',
            icon: '',
        },
        {
            title: 'Mobile App Development',
            description: 'Kami menciptakan aplikasi mobile yang intuitif dan berkinerja tinggi untuk platform iOS dan Android.',
            icon: '',
        },
        {
            title: 'Mobile App Development',
            description: 'Kami menciptakan aplikasi mobile yang intuitif dan berkinerja tinggi untuk platform iOS dan Android.',
            icon: '',
        },
        {
            title: 'Backend Development',
            description: 'Tim backend kami mengembangkan API yang kuat dan aman untuk mendukung aplikasi Anda.',
            icon: '',
        },
        {
            title: 'Mobile App Development',
            description: 'Kami menciptakan aplikasi mobile yang intuitif dan berkinerja tinggi untuk platform iOS dan Android.',
            icon: '',
        },
    ]
</script>

<template>
  <div class="fade-edges w-full relative">
        <div class="grid grid-rows-2 grid-flow-col auto-cols-120 gap-4 overflow-x-auto hide-scrollbar pb-2 pt-1 px-1">
      
      <div 
        v-for="(tool, index) in toolsData" 
        :key="index" 
        class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 shrink-0"
      >
        <!-- Icon Box -->
        <div class="shrink-0 bg-gray-100 p-3 rounded-lg flex items-center justify-center">
          <ToolsIcon>
            <i :class="tool.icon" class="text-3xl text-blue-500"></i>
          </ToolsIcon>
        </div>

        <!-- Text Box -->
        <div class="flex flex-col min-w-0">
          <ToolsTitle class="text-gray-900 font-bold text-base leading-tight truncate">
            {{ tool.title }}
          </ToolsTitle>
          <ToolsDesc class="text-gray-500 text-sm mt-1 line-clamp-2 leading-relaxed">
            {{ tool.description }}
          </ToolsDesc>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 1. EFEK GRADASI KIRI-KANAN (Masking) */
.fade-edges {
  /* Menggunakan mask-image agar ujung kiri dan kanan menghilang perlahan.
     Angka 40px bisa dibesarkan/dikecilkan sesuai seberapa lebar efek pudar yang diinginkan */
  -webkit-mask-image: linear-gradient(to right, transparent, black 40px, black calc(100% - 20px), transparent);
  mask-image: linear-gradient(to right, transparent, black 40px, black calc(100% - 20px), transparent);
}

/* 2. MENYEMBUNYIKAN SCROLLBAR (TETAP BISA SCROLL/SWIPE) */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE dan Edge */
  scrollbar-width: none;  /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, dan Opera */
}


/* ========================================================
   OPSI ALTERNATIF: JIKA INGIN SCROLLBAR CUSTOM (TIDAK DIHILANGKAN) 
   Hapus class 'hide-scrollbar' di atas, dan ganti dengan 'custom-scrollbar'
   lalu uncomment kode CSS di bawah ini:
   ======================================================== */

/*
.custom-scrollbar::-webkit-scrollbar {
  height: 8px; 
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1); 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4); 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.6); 
}
*/
</style>