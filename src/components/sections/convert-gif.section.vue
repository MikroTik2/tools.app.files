<template>
     <Container>
          <Section>
               <div class="group"></div>

               <div v-if="fileSelected">
                    <CardGragdrop
                         title="Drag and drop video file to convert"
                         description="The video-to-GIF conversion happens locally on your device; no data is sent to our servers."
                         command="convertToGif"
                         @file-preview="updateVideoPreview"
                         @file-selected="updateFileSelectionStatus"
                    />
               </div>

               <div class="w-full" v-else>
                    <div
                         class="flex flex-col min-w-[70vw] gap-2 w-full items-center justify-center"
                    >
                         <div class="w-full h-[60vh] p-1 border bg-black rounded-3xl relative">
                              <div
                                   class="rounded-2xl w-full h-full absolute top-0 left-0 overflow-hidden"
                              >
                                   <Image
                                        v-if="videoConvertToGif.gif_blob"
                                        :src="videoConvertToGif.gif_blob"
                                        alt="gif"
                                        class="w-full saturate-0 h-full object-contain"
                                   />

                                   <video
                                        :src="videoPreviewUrl"
                                        :class="{
                                             'w-full h-full object-contain opacity-50': loading,
                                        }"
                                        class="w-full saturate-0 h-full opacity-50 object-contain"
                                        v-else
                                   />
                              </div>
                         </div>

                         <div
                              class="w-full flex pt-1 items-center gap-4"
                              v-if="progressionValue[0] !== 1"
                         >
                              <Slider v-model="progressionValue" :max="1" :min="0" />
                         </div>

                         <div class="grid grid-cols-1 gap-4 pt-6 w-full">
                              <CardInfo
                                   title="Original"
                                   variant="default"
                                   format="gif"
                                   :size="formatBytes(videoConvertToGif.size_original)"
                                   :video="videoConvertToGif.gif_blob"
                                   :name="videoConvertToGif.name"
                                   :disabled="progressionValue[0]"
                                   @clear="clearVideoData"
                              />
                         </div>

                         <CardDekstop />
                    </div>
               </div>

               <div class="group"></div>

               <Footer />
          </Section>
     </Container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { formatBytes } from '@/helpers/format-bytes.helper';
import { ffmpegService, loading, progression, videoConvertToGif } from '@/services/ffmpeg.service';

import Slider from '@/components/ui/slider/Slider.vue';
import Container from '@/components/ui/container.vue';
import Section from '@/components/ui/section.vue';
import CardGragdrop from '@/components/card-dragdrop.vue';
import CardDekstop from '@/components/card-dekstop.vue';
import Footer from '@/components/layouts/footer.vue';
import CardInfo from '@/components/card-info.vue';
import Image from '@/components/ui/image.vue';

const router = useRouter();

const fileSelected = ref<boolean>(true);
const videoPreviewUrl = ref<string>('');

const progressionValue = computed(() => [parseFloat(Number(progression.value).toFixed(3))]);

const updateFileSelectionStatus = (selected: boolean) => {
     fileSelected.value = selected;
};

const updateVideoPreview = (video: string) => {
     videoPreviewUrl.value = video;
};

const clearVideoData = () => {
     ffmpegService.reset();
     videoPreviewUrl.value = '';

     router.push('/');
};
</script>
