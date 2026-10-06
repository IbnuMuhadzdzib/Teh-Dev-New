<script setup lang="ts">
import { Mail, MessageCircle, Globe } from "@lucide/vue";

import { FooterMenuLink, FooterContactCard, FooterMap } from "@/components/landing-page/footer";

const menus = [
  { href: "#home", label: "Beranda" },
  { href: "#about", label: "Tentang Kami" },
  { href: "#services", label: "Layanan" },
  { href: "#contact", label: "Keunggulan" },
];

const contacts = [
  { icon: Mail, label: "Email", value: "Ahmadfatiridn@gmail.com" },
  { icon: MessageCircle, label: "Whatsapp", value: "+1092-9328-3923" },
  { icon: Globe, label: "Website", value: "www.tehdeveloper.id" },
];

const mapSrc =
  "https://www.google.com/maps?q=Paris+Van+Java,+Bandung,+Indonesia&output=embed";
</script>

<template>
  <footer class="flex w-full flex-col items-center px-24 py-12 mt-36">
    <div class="grid w-full grid-cols-[1fr_1.6fr_1.4fr] gap-16 rounded-3xl border border-gray-200 px-16 py-12">
      <div class="flex flex-col gap-5">
        <h3 class="font-sf text-base font-medium text-[#33B261]">Menu</h3>
        <div class="flex flex-col gap-4">
          <FooterMenuLink
            v-for="menu in menus"
            :key="menu.href"
            :href="menu.href"
            :label="menu.label"
          />
        </div>
      </div>

      <div class="flex flex-col gap-5">
        <h3 class="font-sf text-base font-medium text-[#33B261]">Kontak Kami</h3>
        <div class="flex flex-col gap-4">
          <FooterContactCard
            v-for="contact in contacts"
            :key="contact.label"
            :icon="contact.icon"
            :label="contact.label"
            :value="contact.value"
          />
        </div>
      </div>

      <div class="flex flex-col gap-5">
        <h3 class="font-sf text-base font-medium text-[#33B261]">Alamat</h3>
        <FooterMap :src="mapSrc" title="Lokasi Teh Developer" />
        <p class="font-sf text-base text-gray-700">
          Jalan wowok suka teddy lalu date di paris van java, indonesia
        </p>
      </div>
    </div>

    <p class="font-sf mt-8 text-sm text-gray-400">
      © 2026 tehdeveloper.id. Hak cipta dilindungi.
    </p>
  </footer>
</template>
