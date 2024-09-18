<template>
     <component v-bind="$attrs" :is="icon"></component>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import type { IPropsIcon } from '@/models/icon.model';

const props = defineProps<IPropsIcon>();

const icon = defineAsyncComponent(
     () => import(/* @vite-ignore */ `/public/icons/${props.name}.svg?component`),
);
</script>
