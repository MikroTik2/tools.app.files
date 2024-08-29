<template>
     <div class="bg-foreground/5 border w-full p-5 overflow-hidden justify-center lg:justify-start rounded-2xl flex flex-col md:flex-row">
          <div class="grid lg:flex items-center gap-2">
               <a class="flex justify-center lg:justify-start text-center items-center gap-2" href="https://tally.so/r/w2LopM">
                    <Image src="/icons/icon-compress.svg" alt="compress-app-icon" class="w-7 h-7 sm:block hidden" />
                    <span class="border-b border-foreground/30">Compress Desktop App</span>
               </a>

               <div class="flex justify-center lg:justify-start gap-1 opacity-50">
                    <Image src="/icons/icon-apple.svg" alt="apple-icon" />
                    <Image src="/icons/icon-windows.svg" alt="windows-icon" />
               </div>

               <span class="text-muted-foreground lg:text-start text-center">10x faster. Multi-file. 2GB+. Even smaller, even better quality.</span>
          </div>
     </div>
</template>

<script setup lang="ts">
     import Image from '@/components/ui/image.vue';
</script>