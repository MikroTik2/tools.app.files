<template>
     <section
          v-bind="$attrs"
          class="flex flex-col items-center justify-center py-5 min-h-screen saturate-0"
     >
          <slot />
     </section>
</template>
