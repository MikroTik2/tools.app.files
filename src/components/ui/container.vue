<template>
     <div :class="classes" v-bind="$attrs">
          <slot />
     </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IContainerProps {
     class?: string;
}

const props = defineProps<IContainerProps>();

const classes = computed(() => {
     return ['mx-auto', 'w-11/12', 'max-w-10xl', props.class || ''].join(' ');
});
</script>
