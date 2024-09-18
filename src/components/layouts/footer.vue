<template>
     <footer
          id="footer"
          class="text-sm text-center justify-center flex-wrap md:flex-nowrap mt-5 flex items-center gap-1"
     >
          <div>It's free. From your friends at</div>

          <a
               class="border-b border-foreground/30 inline-flex items-center gap-1"
               href="https://ffmpeg.org"
          >
               <Icon name="ffmpeg" />
               <div>FFmpeg</div>
          </a>

          <a class="border-b border-foreground/30 inline-flex items-center gap-1" href="/"
               >More tools</a
          >
     </footer>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/icon.vue';
</script>
