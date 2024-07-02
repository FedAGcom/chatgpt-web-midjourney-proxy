<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NButton, NModal } from 'naive-ui'
import { useAuthStore, useUserStore } from '@/store'

interface Props {
  visible: boolean
}

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const authStore = useAuthStore()

const userStore = useUserStore()

const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)

const role = computed(() => userStore.userInfo.role)

const active = ref('Advanced')

const handleGoToRates = () => {
  window.location.href = 'https://neuroscribe.ru/'
}

const show = computed({
  get() {
    return props.visible
  },
  set(visible: boolean) {
    emit('update:visible', visible)
  },
})
</script>

<template>
  <NModal v-model:show="show" :auto-focus="false" preset="card" style="width: 95%; max-width: 640px">
    <div>
      <span class="text-sm">{{ $t('store.unavaliableModal') }}</span>
      <div class="flex-1 pt-4">
        <NButton block @click="handleGoToRates">
          {{ $t('store.goToRates') }}
        </NButton>
      </div>
    </div>
  </NModal>
</template>
