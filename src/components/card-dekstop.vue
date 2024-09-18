<template>
     <div
          class="bg-foreground/5 border w-full p-5 overflow-hidden justify-center lg:justify-start rounded-2xl flex flex-col md:flex-row"
     >
          <div class="grid lg:flex items-center gap-2">
               <a
                    class="flex justify-center lg:justify-start text-center items-center gap-2"
                    href="https://tally.so/r/w2LopM"
               >
                    <Icon name="compress" class="w-7 h-7 hidden sm:block" />
                    <span class="border-b border-foreground/30">Compress Desktop App</span>
               </a>

               <div class="flex justify-center lg:justify-start gap-1 opacity-50">
                    <Icon name="apple" />
                    <Icon name="windows" />
               </div>

               <span class="text-muted-foreground lg:text-start text-center"
                    >10x faster. Multi-file. 2GB+. Even smaller, even better quality.</span
               >
          </div>
     </div>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/icon.vue';
</script>
