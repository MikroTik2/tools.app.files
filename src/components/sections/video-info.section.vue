<template>
     <Container>
          <Section>
               <div class="group"></div>

               <div class="sm:flex-row flex-col-reverse flex gap-10" v-if="fileSelected">
                    <div class="opacity-70">
                         <h1>Get video info</h1>

                         <ul class="list-disc mt-5 list-inside">
                              <li v-for="(element, i) in videoInfoLabels" :key="i">
                                   {{ element.label }}
                              </li>
                         </ul>
                    </div>

                    <CardDragdrop
                         title="Drag and drop video file to compress"
                         description="Compression happens on your device, no data is sent to our servers"
                         command="getFileDetails"
                         @file-selected="updateFileSelectionStatus"
                    />
               </div>

               <Loader v-else-if="loading" />

               <div v-else class="flex w-full flex-col gap-2">
                    <h1 class="text-2xl font-bold">Video information</h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                         <div
                              class="bg-foreground/5 p-5 border rounded-lg"
                              v-for="(element, i) in videoDetailCards"
                              :key="i"
                         >
                              <div class="flex items-top gap-[2px] group">
                                   <div>
                                        {{ element.value }}
                                        <span v-if="element.format">
                                             {{ element.format }}
                                        </span>
                                   </div>
                              </div>

                              <h2 class="text-sm text-muted-foreground">{{ element.label }}</h2>
                         </div>
                    </div>
               </div>

               <div class="group"></div>

               <Footer />
          </Section>
     </Container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { videoInfo, loading } from '@/services/ffmpeg.service';

import { formatBytes } from '@/helpers/format-bytes.helper';

import CardDragdrop from '@/components/card-dragdrop.vue';
import Container from '@/components/ui/container.vue';
import Footer from '@/components/layouts/footer.vue';
import Section from '@/components/ui/section.vue';
import Loader from '@/components/ui/loader.vue';

const fileSelected = ref<boolean>(true);

interface IVideoInfoLabels {
     label: string;
}

interface IVideoDetailCards {
     label: string;
     value: string | number | null;
     format?: string;
}

const videoInfoLabels = ref<IVideoInfoLabels[]>([
     { label: 'File size' },
     { label: 'Video codec' },
     { label: 'Frame rate' },
     { label: 'Dimensions' },
     { label: 'Duration' },
     { label: 'Last modified' },
]);

const videoDetailCards = computed<IVideoDetailCards[]>(() => [
     { label: 'File name', value: videoInfo.value.name },
     { label: 'File size', value: formatBytes(videoInfo.value.size) },
     { label: 'Frames per second', format: 'fps', value: videoInfo.value.fps },
     {
          label: 'Dimensions',
          format: 'px',
          value: `${videoInfo.value.dimensions.width} × ${videoInfo.value.dimensions.height}`,
     },
     { label: 'Duration', format: 's', value: `${videoInfo.value.duration_in_seconds}` },
     { label: 'Video codec', value: videoInfo.value.video_codec },
     { label: 'Audio codec', value: videoInfo.value.audio_codec },
     { label: 'Last modified', value: videoInfo.value.last_modified },
]);

const updateFileSelectionStatus = (selected: boolean) => {
     fileSelected.value = selected;
};
</script>
