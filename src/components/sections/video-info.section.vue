<template>
     <Container>
          <Section>
               <div class="group"></div>

               <div class="sm:flex-row flex-col-reverse flex gap-10" v-if="fileSelected">
                    <div class="opacity-70">
                         <h1>Get video info</h1>

                         <ul class="list-disc mt-5 list-inside">
                              <li v-for="(element, i) in infoItems" :key="i">
                                   {{ element.label }}
                              </li>
                         </ul>
                    </div>

                    <CardUploadVideo
                         title="Drag and drop video file to compress"
                         description="Compression happens on your device, no data is sent to our servers"
                         command="file_info"
                         @file-selected="handleFileSelected"
                    />
               </div>

               <Loader v-else-if="loading" />

               <div class="flex w-full flex-col gap-2" v-else>
                    <h1 class="text-2xl font-bold">Video information</h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                         <div
                              class="bg-foreground/5 p-5 border rounded-lg"
                              v-for="(element, i) in cardItems"
                              :key="i"
                         >
                              <div class="flex items-top gap-[2px] group">
                                   <div>
                                        {{ element.value }}
                                        <span class="text-muted-foreground" v-if="element.format">
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
import CardUploadVideo from '@/components/card-upload-video.vue';
import Container from '@/components/ui/container.vue';
import Footer from '@/components/layouts/footer.vue';
import Section from '@/components/ui/section.vue';
import Loader from '@/components/ui/loader.vue';

import type { IInfoItem } from '@/models/info-item.model';
import type { ICardItem } from '@/models/card-items.model';

import { computed, ref } from 'vue';
import { videoInfo, loading } from '@/services/ffmpeg.service';

const fileSelected = ref<boolean>(true);

const infoItems = ref<IInfoItem[]>([
     { label: 'File size' },
     { label: 'Video codec' },
     { label: 'Frame rate' },
     { label: 'Dimensions' },
     { label: 'Duration' },
     { label: 'Last modified' },
]);

const cardItems = computed<ICardItem[]>(() => [
     { label: 'File name', value: videoInfo.value.name },
     { label: 'File size', format: 'bytes', value: videoInfo.value.size },
     { label: 'Frames per second', format: 'fps', value: videoInfo.value.fps },
     {
          label: 'Dimensions',
          format: 'px',
          value: `${videoInfo.value.dimensions.width} × ${videoInfo.value.dimensions.height}`,
     },
     { label: 'Duration', format: 's', value: `${videoInfo.value.durationInSeconds}` },
     { label: 'Video codec', value: videoInfo.value.videoCodec },
     { label: 'Audio codec', value: videoInfo.value.audioCodec },
     { label: 'Last modified', value: videoInfo.value.lastModified },
]);

const handleFileSelected = (selected: boolean) => {
     fileSelected.value = selected;
};
</script>
