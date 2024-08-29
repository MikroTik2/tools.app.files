import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Tools from '@/views/tools.vue'
import Compress from '@/views/compress.vue'
import VideoInfo from '@/views/video-info.vue'

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
]

const router = createRouter({
     history: createWebHistory('/'),
     routes,
})

router.beforeEach((to, from, next) => {
     document.title = <string>to.meta.title

     if (to.path.match(/^\/https?:\/\//)) {
          const externalUrl = to.path.substring(1)
          window.location.href = externalUrl
     } else {
          next()
     }

     next()
})

export default router
