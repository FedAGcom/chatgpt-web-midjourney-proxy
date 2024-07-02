<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NDrawer, NDrawerContent } from 'naive-ui'
import { homeStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
// import { copyText3 } from "@/utils/format";
const { isMobile } = useBasicLayout()
const route = useRoute()
const st = ref({ show: false, showImg: false })
// const initLoad = () => {
//   // gallery
//   mlog('toGallery', route.query)
//   mlog('toGallery', homeStore.myData.session)
//   if (homeStore.myData.session.baiduId)
//     tjBaidu(homeStore.myData.session.baiduId)
//   if (homeStore.myData.session.googleId)
//     tjGoogle(homeStore.myData.session.googleId)
//   // if( _GET('to') =='gallery'){
//   //     homeStore.setMyData({act:'gallery'})
//   // }
// }
watch(() => homeStore.myData.act, (act) => {
  act == 'help' && (st.value.showImg = true)
  // act=='copy' &&   copyText3('addd890').then(dd=>console.log('ddd',dd ) );
})

// const youtubeVideoId = ref('dQw4w9WgXcQ') // Пример YouTube ID, замените на нужный
const youtubeVideoIds = ref([
  'dQw4w9WgXcQ', // Пример YouTube ID, замените на нужные
  '0fVbsZxoZBU',
  'w3jLJU7DT5E',
  'N4tTd_VBXkM',
  'tAGnKpE4NCI',
  '2Vv-BfVoq4g',
])

const getYoutubeEmbedUrl = (videoId: string) => {
  // return `https://www.youtube.com/embed/${videoId}`
  return 'https://www.youtube.com/watch?v=0fVbsZxoZBU&t=681s&ab_channel=kujipodcast'
}
console.log('ST', st)
// const tjBaidu = (baiduID: string) => {
//   window._hmt = window._hmt || []
//   const hm = document.createElement('script')
//   hm.src = `https://hm.baidu.com/hm.js?${baiduID}`
//   const s = document.getElementsByTagName('script')[0] as HTMLScriptElement
//   s.parentNode && s.parentNode.insertBefore(hm, s)
//   mlog('tjBaidu', hm.src)
// }
// const tjGoogle = (googleId: string) => {
//   window.dataLayer = window.dataLayer || []
//   const hm = document.createElement('script')
//   hm.src = `https://www.googletagmanager.com/gtag/js?id=${googleId}`
//   const s = document.getElementsByTagName('script')[0] as HTMLScriptElement
//   s.parentNode && s.parentNode.insertBefore(hm, s)
//   function gtag(...arg: any) { window.dataLayer.push(arguments) }
//   gtag('js', new Date())
//   gtag('config', googleId)
// }

// const baiduID= computed(()=>homeStore.myData.session.baiduID );

// initLoad()
</script>

<template>
  <NDrawer v-model:show="st.showImg" :placement="isMobile ? 'bottom' : 'right'" :class="isMobile ? ['!h-[90vh]'] : ['!w-[80vw]']" style="--n-body-padding:0">
    <NDrawerContent :title="$t('helptab.help')" closable>
      <!-- <gallery v-if="st.showImg" @close="st.showImg = false" /> -->
      <div class="wrapper">
        <div v-for="videoId in youtubeVideoIds" :key="videoId" class="video-container">
          <iframe
            v-if="st.showImg"
            :src="getYoutubeEmbedUrl(videoId)"
            width="300"
            height="200"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
    </NDrawerContent>
  </NDrawer>

<!-- <template v-if="baiduID">
  <script>
		 window._hmt=window._hmt || [];
   var hm = document.createElement("script");
   hm.src = "https://hm.baidu.com/hm.js?"+baiduID;
   var s = document.getElementsByTagName("script")[0];
   s.parentNode.insertBefore(hm, s);
	</script>
</template> -->
</template>

<style>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
}
</style>
