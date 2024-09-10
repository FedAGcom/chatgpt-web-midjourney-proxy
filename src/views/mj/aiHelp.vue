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
  // 'dQw4w9WgXcQ', // Пример YouTube ID, замените на нужные
  'https://rutube.ru/play/embed/0525969a928a165baa3a85499fd749ac',
  'https://rutube.ru/play/embed/5c89f5e38534bb2aaa8fb7be021928b2',
  'https://rutube.ru/play/embed/d67794e3539d86311c50b8ff9bc173d5',
  'https://rutube.ru/play/embed/af16d175a527e0fce6fbff53f59580ae',
  'https://rutube.ru/play/embed/efc9a0a3f78d4bd276bb01fe3307df0d',
  'https://rutube.ru/play/embed/57a11918e576a9d335bc04c6145d7b19',
  'https://rutube.ru/play/embed/498547ee65de2db2b48020c0ea4ceb1f',
  'https://rutube.ru/play/embed/35526182bbe578c27485bdf027a8a0aa',
  'https://rutube.ru/play/embed/ec34621847d284e00b1c9e25f81f3202',
  'https://rutube.ru/play/embed/b4bfa28762be189c2497733fd3a9bc2b',
  'https://rutube.ru/play/embed/04d3150f57e270e3df3609fea28f7b14',
  'https://rutube.ru/play/embed/7b38f6daef1a6bc1c01e9ca5072ba3b1',
  'https://rutube.ru/play/embed/772b0564971a69f30ba7671b889d91c4',
  'https://rutube.ru/play/embed/7431d029bf38f78624304f45510d406b',
  'https://rutube.ru/play/embed/da7c0add650f73f1caec030438fd4852',
  'https://rutube.ru/play/embed/28689eaab4574089357dfdb202c538b0',
  'https://rutube.ru/play/embed/e3f73386e5b03b3b7087ab66e15fb683',
  'https://rutube.ru/play/embed/d6ad0c1b20b81f9ede1539d086f3b2a8',
  'https://rutube.ru/play/embed/a2daaf283fd91909767d2194983159a4',
  'https://rutube.ru/play/embed/767fc0ac3e4a204204f33a50d9dcf107',
  'https://rutube.ru/play/embed/67c8b40bba10489fba3d9bf2e5c1327c',
  'https://rutube.ru/play/embed/d54c1c617615188baee1c990186900a2',
  'https://rutube.ru/play/embed/76ee72de9de09b3b688c11506afb2278',
  'https://rutube.ru/play/embed/429a412fcef975587a612f3009c7e488',
  'https://rutube.ru/play/embed/aed0961e9aa2accd0d6b815e34331d29',
  'https://rutube.ru/play/embed/afd23fd9d4a06f75e709cc550dc40359',
  'https://rutube.ru/play/embed/4a0f52c69b596807dcc18a5439ccaabe',
])

// const getYoutubeEmbedUrl = (videoId: string) => {
//   return 'https://yadi.sk/i/ip-stJ6gi9d2_g/%D0%90%D0%BD%D0%B0%D0%BB%D0%B8%D0%B7%20%D0%A6%D0%B5%D0%BB%D0%B5%D0%B2%D0%BE%D0%B8%CC%86%20%D0%B0%D1%83%D0%B4%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B8%20%D1%81%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E%20%D0%BD%D0%B5%D0%B8%CC%86%D1%80%D0%BE%D1%81%D0%B5%D1%82%D0%B8%20_%20%D0%9D%D0%B5%D0%B8%CC%86%D1%80%D0%BE%D1%81%D0%BA%D1%80%D0%B0%D0%B8%CC%86%D0%B1.mp4'
// }

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
            width="300"
            height="200"
            :src="videoId"
            allow="autoplay; encrypted-media; screen-wake-lock" frameborder="0" allowfullscreen
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
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  padding: 20px;
}
</style>
