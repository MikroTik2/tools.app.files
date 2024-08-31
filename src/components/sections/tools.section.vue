<template>
     <Container>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <CardTool
                    v-for="(element, i) in toolsItems"
                    :key="i"
                    :title="element.title"
                    :description="element.description"
                    :tags="element.tags"
                    :link="element.link"
                    :text="element.text"
               />
          </div>
     </Container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Container from '@/components/ui/container.vue';
import CardTool from '@/components/card-tool.vue';

const toolsItems = ref([
     {
          title: 'Video file compressor',
          description: 'Compress video files by up to 90%',
          link: '/compress',
          text: 'Compress Video',
          tags: ['Mobile', 'Web'],
     },
     {
          title: 'Video Info',
          description:
               'Get information about a video file. File size, duration, codec, resolution, framerate, rotation, last modified. Nothing uploaded, no data sent.',
          link: '/video-info',
          text: 'Get Video Info',
          tags: ['Web'],
     },
     {
          title: 'Video to GIF Conversion',
          description:
               'Convert a video file to GIF format. Specify the output dimensions, frame rate, and quality. No data is sent or uploaded during the conversion process.',
          link: '/video-to-gif',
          text: 'Convert Video to GIF',
          tags: ['Web'],
     },
     {
          title: 'Video transparency tester',
          description: 'See if a video has an alpha channel',
          link: 'https://rotato.app/tools/transparent-video',
          text: 'Test Alpha Transparency',
          tags: ['Web'],
     },
     {
          title: 'Rotato Transparency Converter',
          description: 'Convert videos with alpha transparency for use in Chrome and Safari',
          link: 'https://rotato.app/tools/converter',
          text: 'Convert Alpha Videos to Web',
          tags: ['macOS'],
     },
     {
          title: 'Rotato Video Creator',
          description: 'Experiment: Add animated titles, combine videos and images, with music.',
          link: 'https://video.rotato.app/',
          text: 'Compose Video',
          tags: ['Web'],
     },
     {
          title: 'Rotato Web',
          description: 'Create 3D mockups on Windows, Mac, Linux and iPad',
          link: 'https://app.rotato.app/',
          text: 'Create Mockup in Browser',
          tags: ['Web'],
     },
     {
          title: 'Rotato Mac',
          description: 'Create 3D mockups with a native macOS app.',
          link: 'https://rotato.app/',
          text: 'Create Mockup on Mac',
          tags: ['macOS'],
     },
]);
</script>
