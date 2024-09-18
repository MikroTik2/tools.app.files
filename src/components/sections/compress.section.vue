<template>
     <Container>
          <Section class="h-[inherit]">
               <div class="group"></div>

               <div v-if="fileSelected">
                    <CardUploadVideo
                         title="Drag and drop video file to compress"
                         description="Compression happens on your device, no data is sent to our servers"
                         command="optimizeFileSize"
                         @file-preview="handlePreviewVideo"
                         @file-selected="handleFileSelected"
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
                                   <video
                                        v-if="videoCompress.video_blob"
                                        :src="videoCompress.video_blob"
                                        playsinline
                                        ref="videoPlayer"
                                        class="w-full saturate-0 h-full object-contain"
                                        @timeupdate="handleUpdateSlider"
                                        @ended="handleRestartVideo"
                                   />

                                   <video
                                        :src="videoPreviewUrl ?? ''"
                                        :class="{
                                             'w-full h-full object-contain opacity-50':
                                                  progressionValue[0] !== 1,
                                        }"
                                        class="w-full saturate-0 h-full opacity-50 object-contain"
                                        v-else
                                   />
                              </div>
                         </div>

                         <div class="w-full flex pt-1 items-center gap-4">
                              <button type="button" @click="handleTrackPlayPause">
                                   <Pause class="w-5 h-5" v-if="startTrack" />
                                   <Play class="w-5 h-5" v-else />
                              </button>

                              <Slider
                                   v-model="videoSlide"
                                   :max="1000"
                                   :min="0"
                                   v-if="progressionValue[0] === 1"
                                   @update:model-value="handleSliderChange"
                              />
                              <Slider v-model="progressionValue" :max="1" :min="0" v-else />
                         </div>

                         <div class="grid md:grid-cols-2 grid-cols-1 gap-4 pt-6 w-full">
                              <CardInfo
                                   title="Original"
                                   variant="secondary"
                                   :size_original="videoCompress.size_original"
                                   :disabled="progressionValue[0]"
                                   @clear="handleRemove"
                                   :size="useFormatBytes(videoCompress.size_original)"
                                   format="trash"
                              />
                              <CardInfo
                                   title="Compressed"
                                   variant="default"
                                   format="download"
                                   :stats="
                                        useCompressionStats(
                                             videoCompress.size_original,
                                             videoCompress.size_compressed,
                                        )
                                   "
                                   :size="useFormatBytes(videoCompress.size_compressed)"
                                   :video="videoCompress.video_blob"
                                   :name="videoCompress.name"
                                   :disabled="progressionValue[0]"
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
import { computed, ref } from 'vue';
import { Pause, Play } from 'lucide-vue-next';
import { videoCompress, ffmpegService, progression } from '@/services/ffmpeg.service';
import { useFormatBytes } from '@/helpers/use-format-bytes.helper';
import { useCompressionStats } from '@/helpers/use-compression-stats.helper';

import { useRouter } from 'vue-router';

import CardInfo from '@/components/card-info.vue';
import CardUploadVideo from '@/components/card-dragdrop.vue';
import CardDekstop from '@/components/card-dekstop.vue';
import Slider from '@/components/ui/slider/Slider.vue';
import Container from '@/components/ui/container.vue';
import Footer from '@/components/layouts/footer.vue';
import Section from '@/components/ui/section.vue';

const videoPlayer = ref<HTMLVideoElement | null>(null);
const videoPreviewUrl = ref<string | null>(null);
const fileSelected = ref<boolean>(true);
const videoSlide = ref<number[]>([0]);
const startTrack = ref<boolean>(false);

const progressionValue = computed(() => [parseFloat(Number(progression.value).toFixed(3))]);

const router = useRouter();

const handleRemove = () => {
     ffmpegService.reset();
     videoPreviewUrl.value = null;

     router.push('/');
};

const handlePreviewVideo = (video: string) => {
     videoPreviewUrl.value = video;
};

const handleFileSelected = (selected: boolean) => {
     fileSelected.value = selected;
};

const handleSliderChange = (value: number[] | undefined) => {
     if (videoPlayer.value && value && value.length > 0) {
          videoPlayer.value.currentTime = (value[0] / 1000) * videoPlayer.value.duration;
     }
};

const handleTrackPlayPause = () => {
     if (videoPlayer.value) {
          if (startTrack.value) {
               videoPlayer.value.pause();
          } else {
               videoPlayer.value.play();
          }

          startTrack.value = !startTrack.value;
     }
};

const handleRestartVideo = () => {
     if (videoPlayer.value) {
          videoPlayer.value.currentTime = 0;
          videoPlayer.value.play();
     }
};

const handleUpdateSlider = () => {
     if (videoPlayer.value) {
          videoSlide.value = [(videoPlayer.value.currentTime / videoPlayer.value.duration) * 1000];
     }
};
</script>
