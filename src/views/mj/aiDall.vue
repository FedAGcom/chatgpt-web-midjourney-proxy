<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { NButton, NInput, NSelect, useMessage } from 'naive-ui'
import { homeStore } from '@/store'
import { SvgIcon } from '@/components/common'

const ms = useMessage()
const config = ref({
  model: [
    { label: 'DALL·E 3', value: 'dall-e-3' },
    { label: 'DALL·E 2', value: 'dall-e-2' },
  ],
})
const optionsConfig = ref({
  options: [
    { label: 'Фотореализм', value: 'Фотореализм' },
    { label: 'Иллюстрация', value: 'Иллюстрация' },
  ],
})
const st = ref({ isGo: false })
const o = ref({ options: '' })
const f = ref({ size: '512x512', prompt: '', model: 'dall-e-2', n: 1 })
const isDisabled = computed(() => {
  if (st.value.isGo)
    return true
  if (f.value.prompt.trim() == '')
    return true
  return false
})
const create = async () => {
  // const d= await gptFetch('/v1/embeddings',{
  // "input":  f.value.prompt,
  // "model": "text-embedding-ada-002"
  // });
  // mlog('test',d );
  // return ;

  let finalPrompt = f.value.prompt

  if (o.value.options === 'Фотореализм')
    finalPrompt += ' photorealistic, detailed textures, natural lighting.'
  else if (o.value.options === 'Иллюстрация')
    finalPrompt += ' illustration, stylized, cartoonish details.'

  const obj = {
    action: 'gpt.dall-e-3',
    data: {
      ...f.value,
      prompt: finalPrompt,
    },
  }
  homeStore.setMyData({ act: 'draw', actData: obj })
  st.value.isGo = true
}
watch(() => homeStore.myData.act, (n) => {
  if (n == 'dallReload') {
    st.value.isGo = false
    f.value.prompt = ''
  }
  if (n == 'updateChat')
    st.value.isGo = false
})

const dimensionsList = computed(() => {
  return [{
    label: '512px*512px',
    value: '512x512',
  },
  {
    label: '1024px*1024px',
    value: '1024x1024',
  },
  ]
})
watch(() => f.value.model, (n) => {
  f.value.size = '1024x1024'
})
</script>

<template>
  <section class="mb-4 flex justify-between items-center">
    <div>{{ $t('mjchat.version') }} </div>
    <NSelect v-model:value="f.model" :options="config.model" size="small" class="!w-[70%]" :clearable="false" />
  </section>
  <section class="mb-4 flex justify-between items-center">
    <div>{{ $t('mjchat.size') }}</div>
    <NSelect v-model:value="f.size" :options="dimensionsList" size="small" class="!w-[70%]" :clearable="false" />
  </section>
  <section class="mb-4 flex justify-between items-center">
    <div>{{ $t('mjchat.dalleOptions') }} </div>
    <NSelect v-model:value="o.options" :options="optionsConfig.options" size="small" class="!w-[70%]" :clearable="false" />
  </section>
  <div class="mb-1">
    <NInput
      v-model:value="f.prompt" type="textarea" :placeholder="$t('mjchat.prompt')" round clearable maxlength="500" show-count
      :autosize="{ minRows: 3, maxRows: 10 }"
    />
  </div>

  <div class="mb-4 flex justify-end items-center">
    <div class="flex ">
      <NButton type="primary" :block="true" :disabled="isDisabled" @click="create()">
        <SvgIcon icon="mingcute:send-plane-fill" />
        {{ $t('mjchat.imgcreate') }}
      </NButton>
    </div>
  </div>

  <ul class="pt-4" v-html="$t('mjchat.dalleInfo')" />
</template>
