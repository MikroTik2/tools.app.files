<template>
     <Button
          v-if="type === 'button'"
          :disabled="props.disabled"
          :variant="props.variant"
          :type="props.type"
     >
          <slot />
     </Button>

     <router-link
          v-else
          :to="`${props.href}`"
          :class="cn(buttonVariants({ variant: props.variant }))"
     >
          <slot />
     </router-link>
</template>

<script lang="ts" setup>
import { buttonVariants, Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { IButtonProps } from '@/models/button.model';

const props = defineProps<IButtonProps>();
</script>
