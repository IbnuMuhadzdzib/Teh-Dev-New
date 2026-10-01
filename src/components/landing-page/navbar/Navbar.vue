<script setup>
import NavbarLogo from "./NavbarLogo.vue";
import NavbarLink from "./NavbarLink.vue";
import NavbarButton from "./NavbarButton.vue";

const navLinks = [
  { href: "#home", label: "Beranda" },
  { href: "#about", label: "Tentang Kami" },
  { href: "#services", label: "Layanan" },
  { href: "#contact", label: "Keunggulan" },
];
</script>

<template>
  <nav class="flex items-center justify-between px-24 py-8 bg-transparent fixed w-full top-0 z-50">
    <NavbarLogo />

    <div class="flex items-center gap-12">
      <div class="flex items-center gap-12">
        <NavbarLink
          v-for="(link, index) in navLinks"
          :key="index"
          :href="link.href"
          :label="link.label"
        />
      </div>

      <NavbarButton label="Kontak" />
    </div>
  </nav>
</template>
