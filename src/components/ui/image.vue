<template>
     <img
          :src="props.src"
          :alt="props.alt"
          :loading="props.isAboveTheFold ? 'eager' : 'lazy'"
          decoding="async"
     />
</template>

<script setup lang="ts">
interface IImageProps {
     src: string;
     alt: string;
     isAboveTheFold?: boolean;
}

const props = defineProps<IImageProps>();
</script>
