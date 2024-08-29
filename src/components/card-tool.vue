<template>
     <Card class="p-8 rounded-2xl flex flex-col justify-between gap-5">
          <div>
               <h2 class="text-xl font-bold">{{ props.title }}</h2>
               <p class="text-muted-foreground mt-5">{{ props.description }}</p>
          </div>

          <div class="grid gap-4">
               <Button type="link" :href="props.link">{{ props.text }}</Button>

               <div class="inline-flex gap-2">
                    <Badge variant="outline" :key="i" v-for="(element, i) in props.tags">{{ element }}</Badge>
               </div>
          </div>
     </Card>
</template>

<script setup lang="ts">
     import { Card } from '@/components/ui/card';
     import { Badge } from '@/components/ui/badge';
     import Button from '@/components/ui/button.vue';

     interface IPropsCard {
          title: string;
          description: string;
          text: string;
          link: string;
          tags: string[];
     };

     const props = defineProps<IPropsCard>();
</script>
