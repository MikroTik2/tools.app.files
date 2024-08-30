<template>
     <Container>
          <Section>
               <div class="sm:flex grid">
                    <h1
                         class="text-2xl text-center sm:text-start sm:pr-5 sm:mr-5 font-medium sm:border-r sm:leading-[49px]"
                    >
                         404
                    </h1>

                    <div class="inline-flex">
                         <h2 class="text-sm text-center font-normal sm:leading-[49px]">
                              This page could not be found.
                         </h2>
                    </div>
               </div>
          </Section>
     </Container>
</template>

<script setup lang="ts">
import Container from '@/components/ui/container.vue';
import Section from '@/components/ui/section.vue';
</script>
