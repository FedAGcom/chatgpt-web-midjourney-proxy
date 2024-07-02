<script lang="ts" setup>
import { computed } from 'vue'
import { NAvatar } from 'naive-ui'
import { useUserStore } from '@/store'
import { isString } from '@/utils/is'

interface Props {
  image?: boolean
  logo?: string
}
defineProps<Props>()

const userStore = useUserStore()

const avatar = computed(() => userStore.userInfo.avatar)
</script>

<template>
  <NAvatar v-if="logo" :src="logo" class="n-avatar-new" />
  <template v-else-if="image">
    <NAvatar v-if="isString(avatar) && avatar.length > 0" :src="avatar" :fallback-src="avatar" class="n-avatar-new" />
    <NAvatar v-else round :src="avatar" class="n-avatar-new" />
  </template>
  <NAvatar v-else round :src="avatar" class="n-avatar-new" />
</template>

<style scoped>
  .n-avatar-new {
    --n-merged-color: white;
  }
</style>
