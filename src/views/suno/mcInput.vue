<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { NButton, NInput, NSpin, NSwitch, NTabPane, NTabs, NTag, NTooltip, useMessage } from 'naive-ui'
import { SvgIcon } from '@/components/common'
import { mlog } from '@/api'
import { FeedTask, lyricsFetch, randStyle, sunoFetch } from '@/api/suno'
import { t } from '@/locales'
import { homeStore } from '@/store'

const st = ref({ type: 'custom', isLoading: false, isLoadingLyrics: false })
const des = ref({
  gpt_description_prompt: '',
  make_instrumental: false,
  mv: 'chirp-v3-0',
  prompt: '',
})
const cs = ref({
  prompt: '',
  mv: 'chirp-v3-0',
  title: '',
  tags: '',
  continue_at: 120,
  continue_clip_id: '',

})

const canPost = computed(() => {
  // return true;
  if (st.value.isLoading)
    return false
  if (st.value.type == 'custom')
    return cs.value.tags && cs.value.title

  if (st.value.type == 'description') {
    mlog('des: ', des.value.gpt_description_prompt, des.value.make_instrumental)
    return cs.value.title && (des.value.gpt_description_prompt || des.value.make_instrumental)
  }
  return true
})

const ms = useMessage()
onMounted(() => {
  homeStore.setMyData({ ms })
})
// 生成歌词
const generateLyrics = () => {
  // generate/lyrics
  const prompt = cs.value.prompt || cs.value.title
  if (!prompt) {
    ms.error(t('suno.inputly'))
    return
  }
  if (st.value.isLoading) {
    ms.info(t('suno.doingly'))
    return
  }
  st.value.isLoadingLyrics = true
  ms.info(t('suno.doingly2'))
  sunoFetch('/generate/lyrics/', { prompt }).then(async (r: any) => {
    mlog('lyrics', r)
    const dz: any = await lyricsFetch(r.id)
    mlog('lyrics rz =>', dz)
    if (dz != null) {
      cs.value.prompt = dz.text
      cs.value.title = dz.title
    }
    st.value.isLoadingLyrics = false
  }).catch(() => st.value.isLoadingLyrics = false)
  if (!cs.value.tags)
    cs.value.tags = randStyle()
}

const generate = async () => {
  // st.value.isLoading =false;
  st.value.isLoading = true
  let ids: string[] = ['0d435185-d440-42c8-982a-50205e1cf17d', '43e095ba-5f08-4920-bb3d-89dd0defe0b7']
  ids = ['d359a0aa-adf1-4298-9074-005573d7cc84', '12e3d62f-8fcc-497b-8365-194657582519']

  if (st.value.type == 'custom') {
    if (des.value.make_instrumental)
      cs.value.prompt = ''
    const r: any = await sunoFetch('/generate', cs.value)
    st.value.isLoading = false

    ids = r.clips.map((r: any) => r.id)
    mlog('ids ', ids)
  }
  else {
    des.value.prompt = cs.value.title
    const r: any = await sunoFetch('/generate/description-mode', des.value)
    st.value.isLoading = false
    ids = r.clips.map((r: any) => r.id)
  }
  FeedTask(ids)
}
</script>

<template>
  <div class="p-2">
    <NTabs v-model:value="st.type" type="segment" animated>
      <!-- <n-tab-pane name="start" tab="">

        </n-tab-pane> -->
      <!-- <NText depth="3" class="text-center">{{ $t('suno.mic') }}</NText> -->
      <NTabPane name="description" :tab="$t('suno.description')">
        <div class="pt-1">
          <NInput v-model:value="cs.title" :placeholder="$t('suno.titlepls')">
            <template #prefix>
              <span>{{ $t('suno.title') }}：</span>
            </template>
          </NInput>
        </div>
        <div class="pt-4 flex justify-between">
          <div>{{ $t('suno.desc') }}:</div>
          <div>
            <NSwitch v-model:value="des.make_instrumental" size="small">
              <template #checked>
                {{ $t('suno.noneedly') }}
              </template>
              <template #unchecked>
                {{ $t('suno.noneedly') }}
              </template>
            </NSwitch>
          </div>
        </div>
        <div class="pt-1">
          <NInput
            v-model:value="des.gpt_description_prompt" :disabled="des.make_instrumental"
            :placeholder="$t('suno.descpls')" type="textarea" size="small"
            :autosize="{ minRows: 3, maxRows: 12 }"
          />
        </div>
      </NTabPane>

      <NTabPane name="custom" :tab="$t('suno.custom')">
        <div class="pt-1">
          <NInput v-model:value="cs.title" :placeholder="$t('suno.titlepls')">
            <template #prefix>
              <span>{{ $t('suno.title') }}：</span>
            </template>
          </NInput>
        </div>
        <div class="pt-4">
          <NInput v-model:value="cs.tags" :placeholder="$t('suno.stylepls')">
            <template #prefix>
              <span>{{ $t('suno.style') }}：</span>
            </template>
            <template #suffix>
              <NTooltip placement="right" trigger="hover">
                <template #trigger>
                  <div class="cursor-pointer" @click="cs.tags = randStyle()">
                    <SvgIcon icon="fa:random" class="w-4 h-4" />
                  </div>
                </template>
                <div>{{ $t('suno.rank') }}</div>
              </NTooltip>
            </template>
          </NInput>
        </div>

        <div class="pt-4 flex justify-between">
          <div>{{ $t('suno.ly') }} :</div>
          <div>
            <NSwitch v-model:value="des.make_instrumental" size="small">
              <template #checked>
                {{ $t('suno.noneedly') }}
              </template>
              <template #unchecked>
                {{ $t('suno.noneedly') }}
              </template>
            </NSwitch>
          </div>
        </div>
        <div v-if="st.isLoadingLyrics" class="pt-6 pb-6" style="display: flex; justify-content: center;">
          <NSpin size="small" /> <!-- Спиннер -->
        </div>
        <div v-else class="pt-1">
          <NInput
            v-model:value="cs.prompt" :disabled="des.make_instrumental"
            :placeholder="$t('suno.lypls')" type="textarea" size="small"
            :autosize="{ minRows: 3, maxRows: 12 }"
          />
        </div>
      </NTabPane>
    </NTabs>

    <div class="pt-4">
      <div class="flex justify-between items-start">
        <div>
          <NTag v-if="st.type == 'custom'" type="success" size="small" round>
            <span class="cursor-pointer" @click="generateLyrics()">{{ $t('suno.generately') }}</span>
          </NTag>
        </div>
        <!-- <NButton type="primary" :disabled="!canPost" @click="generate()">
          <SvgIcon icon="ri:music-fill" /> {{ $t('suno.generate') }}
        </NButton> -->
        <div v-if="st.isLoading">
          <NSpin size="small" /> <!-- Спиннер -->
        </div>
        <div v-else>
          <NButton type="primary" :disabled="!canPost" @click="generate()">
            <SvgIcon icon="ri:music-fill" /> {{ $t('suno.generate') }}
          </NButton>
        </div>
      </div>
    </div>
  </div>
</template>
