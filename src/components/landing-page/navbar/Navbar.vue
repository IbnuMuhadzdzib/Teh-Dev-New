<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { animate, stagger, eases } from "animejs";
import gsap from "gsap";

import NavbarLogo from "./NavbarLogo.vue";
import NavbarLink from "./NavbarLink.vue";
import NavbarButton from "./NavbarButton.vue";

const navLinks = [
  { href: "#home", label: "Beranda" },
  { href: "#about", label: "Tentang Kami" },
  { href: "#services", label: "Layanan" },
  { href: "#superiority", label: "Keunggulan" },
];

const scrolled = ref(false);
const navRef = ref<HTMLElement | null>(null);

const applyState = (isScrolled: boolean, immediate = false) => {
  if (!navRef.value) return;
  gsap.to(navRef.value, {
    // --- STATE SCROLLED: jarak dari atas layar (px) ---
    top: isScrolled ? 8 : 0,
    // --- STATE SCROLLED: lebar navbar (px). Kecilkan utk mengecil ke tengah ---
    width: isScrolled ? "1024px" : "100%",
    // --- STATE SCROLLED: tinggi navbar (padding atas & bawah) ---
    paddingTop: isScrolled ? 12 : 24,
    paddingBottom: isScrolled ? 12 : 24,
    // --- STATE SCROLLED: padding kiri & kanan ---
    paddingLeft: isScrolled ? 48 : 96,
    paddingRight: isScrolled ? 48 : 96,
    // --- STATE SCROLLED: border radius (px). Kecil = 12, full rounded = 999 ---
    borderRadius: isScrolled ? 12 : 0,
    // --- STATE SCROLLED: warna background ---
    backgroundColor: isScrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0)",
    // --- STATE SCROLLED: warna border ---
    borderColor: isScrolled ? "rgba(229,231,235,1)" : "rgba(229,231,235,0)",
    // --- durasi & easing transisi morph ---
    duration: immediate ? 0 : 0.5,
    ease: "power2.inOut",
  });
};

const onScroll = () => {
  const next = window.scrollY > 40;
  if (next !== scrolled.value) {
    scrolled.value = next;
    applyState(next);
  }
};

onMounted(() => {
  if (navRef.value) {
    gsap.set(navRef.value, {
      top: 0,
      left: 0,
      right: 0,
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
      padding: "24px 96px",
      borderRadius: 0,
      backgroundColor: "rgba(255,255,255,0)",
      border: "1px solid rgba(229,231,235,0)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    });
  }

  animate(".nav-logo", {
    y: [-40, 0],
    rotate: [-8, 0],
    opacity: [0, 1],
    duration: 900,
    ease: eases.outElastic(1, 0.6),
  });

  animate(".nav-link", {
    y: [-30, 0],
    opacity: [0, 1],
    delay: stagger(90, { start: 250 }),
    duration: 700,
    ease: eases.outBack(1.8),
  });

  animate(".nav-cta", {
    scale: [0, 1],
    rotate: [6, 0],
    opacity: [0, 1],
    delay: 650,
    duration: 800,
    ease: eases.outElastic(1, 0.5),
  });

  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

const linkHover = (e: MouseEvent) => {
  gsap.to(e.currentTarget as HTMLElement, { y: -2, duration: 0.2, ease: "power2.out" });
};

const linkLeave = (e: MouseEvent) => {
  gsap.to(e.currentTarget as HTMLElement, { y: 0, duration: 0.3, ease: "power2.out" });
};

const logoWiggle = (e: MouseEvent) => {
  gsap.fromTo(
    e.currentTarget as HTMLElement,
    { rotate: -6 },
    { rotate: 0, duration: 0.5, ease: "elastic.out(1.2, .4)" },
  );
};

const btnHover = (e: MouseEvent) => {
  gsap.to(e.currentTarget as HTMLElement, { scale: 1.04, duration: 0.2, ease: "power2.out" });
};

const btnLeave = (e: MouseEvent) => {
  gsap.to(e.currentTarget as HTMLElement, { scale: 1, duration: 0.25, ease: "power2.out" });
};
</script>

<template>
  <nav ref="navRef" class="fixed z-50 flex w-full items-center justify-between">
    <div class="nav-logo min-w-50 cursor-pointer" @mouseenter="logoWiggle">
      <NavbarLogo />
    </div>

    <div class="flex items-center gap-12">
      <div class="flex items-center gap-10">
        <div
          v-for="(link, index) in navLinks"
          :key="index"
          class="nav-link"
          @mouseenter="linkHover"
          @mouseleave="linkLeave"
        >
          <NavbarLink :href="link.href" :label="link.label" />
        </div>
      </div>

      <div class="nav-cta" @mouseenter="btnHover" @mouseleave="btnLeave">
        <NavbarButton label="Kontak" />
      </div>
    </div>
  </nav>
</template>
