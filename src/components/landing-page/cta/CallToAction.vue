<script setup lang="ts">
    import CTA from '@/assets/images/sample/sample-3.png'
</script>

<template>
   <section class="flex w-full justify-center mt-36 items-center">
     <div class="flex font-sf bg-transparent rounded-lg border border-gray-200 p-16">
        <div class="flex flex-col space-y-8">
            <div>
                <div class="font-bold text-2xl">
                    <h1>
                        Ingin Mulai Project Dengan Kami? 
                    </h1>
                </div>
                <div class="text-md max-w-md font-light text-gray-600">
                    <p>
                        Dari website hingga desain visual, kami siap membantu mewujudkan kebutuhan digital Anda.
                    </p>
                </div>
            </div>

            <div class="bg-[#33B261] py-2 px-4 w-fit text-white rounded-sm shadow-lg">
                <button>
                    Lihat Detail
                </button>
            </div>
        </div>

        <div>
            <img :src="CTA" alt="CTA Image" class="max-w-lg">
        </div>
    </div>
   </section>
</template>