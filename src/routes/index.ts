import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Tools from '@/views/tools.vue';
import Compress from '@/views/compress.vue';
import VideoInfo from '@/views/video-info.vue';
import ConvertGif from '@/views/convert-gif.vue';
import NotFound from '@/views/not-found.vue';

const routes: RouteRecordRaw[] = [
     { path: '/', name: 'index', component: Tools, meta: { title: 'Video file compressor' } },
     {
          path: '/compress',
          name: 'video-info',
          component: Compress,
          meta: { title: 'Video file compressor' },
     },
     {
          path: '/video-info',
          name: 'compress',
          component: VideoInfo,
          meta: { title: 'Rotato Video Info' },
     },
     {
          path: '/video-to-gif',
          name: 'video-to-gif',
          component: ConvertGif,
          meta: { title: 'Video to GIF Converter' },
     },
     {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: NotFound,
          meta: { title: '404: This is page could not be found' },
     },
];

const router = createRouter({
     history: createWebHistory('/'),
     routes,
});

router.beforeEach((to, from, next) => {
     document.title = <string>to.meta.title;
     
     if (to.path.match(/^\/https?:\/\//)) {
          const externalUrl = to.path.substring(1);
          window.location.href = externalUrl;
     } else {
          next();
     }
});

export default router;
