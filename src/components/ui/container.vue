<template>
     <div :class="classes" v-bind="$attrs">
          <slot />
     </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IContainerProps } from '@/models/container.model';

const props = defineProps<IContainerProps>();

const classes = computed(() => {
     return ['mx-auto', 'w-11/12', 'max-w-10xl', props.class || ''].join(' ');
});
</script>
