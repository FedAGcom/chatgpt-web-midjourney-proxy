<script setup lang='ts'>
import { computed } from 'vue'
import { NButton, NModal } from 'naive-ui'

interface Props {
  visible: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

interface Emit {
  (e: 'update:visible', visible: boolean): void
}

const show = computed({
  get: () => props.visible,
  set: (visible: boolean) => emit('update:visible', visible),
})
</script>

<template>
  <NModal v-model:show="show" style="width: 90%; max-width: 600px;" preset="card">
    <div style="display: flex; justify-content: center; margin-bottom: 20px; font-size: 20px;">
      Тарифы
    </div>
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <NButton block>
        Базовый - 200р
      </NButton>
      <NButton block>
        Про - 400р
      </NButton>
    </div>
  </NModal>
</template>
