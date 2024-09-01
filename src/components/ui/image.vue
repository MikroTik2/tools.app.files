<template>
     <img
          :src="props.src"
          :alt="props.alt"
          :loading="props.isAboveTheFold ? 'eager' : 'lazy'"
          decoding="async"
     />
</template>

<script setup lang="ts">
import type { IImageProps } from '@/models/image.model';

const props = defineProps<IImageProps>();
</script>
