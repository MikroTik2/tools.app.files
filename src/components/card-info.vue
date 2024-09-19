<template>
     <div
          style="align-items: center"
          class="bg-foreground/5 border w-full p-5 overflow-hidden grid-card rounded-2xl flex justify-between"
     >
          <div>
               <div class="text-[0.7rem] uppercase text-muted-foreground">
                    {{ props.title }}
               </div>
               <div class="text-3xl font-bold tracking-tight flex items-end gap-2">
                    <span>{{ props.size }}</span>
               </div>

               <div class="overflow-hidden">
                    <div
                         class="overflow-hidden"
                         style="will-change: auto; opacity: 1; transform: translateY(0%)"
                    >
                         <div
                              v-if="format === 'download'"
                              class="bg-lime-300 mt-1 text-black font-medium opacity-1 rounded-sm text-sm w-max px-2 py-1 flex items-center justify-center"
                              :class="{
                                   'opacity-1': props.disabled === 1,
                                   'opacity-0': props.disabled !== 1,
                              }"
                         >
                              {{ props.stats }}% Smaller
                         </div>
                    </div>
               </div>
          </div>

          <Button
               v-if="format === 'download'"
               type="button"
               @click="handleDownload"
               :disabled="props.disabled !== 1"
               :variant="props.variant"
          >
               Download
          </Button>

          <div class="grid gap-4" v-if="format === 'gif'">
               <Button
                    type="button"
                    variant="secondary"
                    @click="handleRemove"
                    :disabled="props.disabled !== 1"
               >
                    <Trash2 />
               </Button>

               <Button type="button" @click="handleDownload" :disabled="props.disabled !== 1">
                    Download
               </Button>
          </div>

          <Button
               type="button"
               v-if="format === 'trash'"
               @click="handleRemove"
               :disabled="props.disabled !== 1"
               :variant="props.variant"
          >
               <Trash2 />
          </Button>
     </div>
</template>

<script setup lang="ts">
import { downloadFile } from '@/helpers/download-file.helper';
import { Trash2 } from 'lucide-vue-next';

interface ICardInfo {
     title: string;
     disabled: number;
     size?: string;
     stats?: number;
     format?: string;
     video?: string;
     name?: string;
     variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

import Button from '@/components/ui/button/Button.vue';

const props = defineProps<ICardInfo>();
const emits = defineEmits<{
     (event: 'clear'): void;
}>();

const handleRemove = () => {
     emits('clear');
};

const handleDownload = () => {
     if (props.name && props.video) {
          downloadFile(props.video, props.name);
     }
};
</script>
