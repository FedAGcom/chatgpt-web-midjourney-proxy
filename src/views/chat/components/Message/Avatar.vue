<script lang="ts" setup>
import { computed } from 'vue'
import { NAvatar } from 'naive-ui'
import { useAppStore, useUserStore } from '@/store'
import { isString } from '@/utils/is'
import defaultAvatarDark from '@/assets/NeuroScribeLogoSmallDark.svg'
import defaultAvatarLight from '@/assets/NeuroScribeLogoSmallLight.svg'

interface Props {
  image?: boolean
  logo?: string
}
defineProps<Props>()

const userStore = useUserStore()

const avatar = computed(() => userStore.userInfo.avatar)

const appStore = useAppStore()

const theme = computed(() => appStore.theme)

const defaultAvatar = computed(() => theme.value === 'dark'
  ? defaultAvatarDark
  : defaultAvatarLight)
</script>

<template>
  <NAvatar v-if="logo" :src="defaultAvatar" class="n-avatar-new" />
  <template v-else-if="image">
    <NAvatar v-if="isString(avatar) && avatar.length > 0" :src="defaultAvatar" :fallback-src="defaultAvatar" class="n-avatar-new" />
    <NAvatar v-else round :src="defaultAvatar" class="n-avatar-new" />
  </template>
  <NAvatar v-else round :src="defaultAvatar" class="n-avatar-new" />
  <!-- <NAvatar v-if="logo" :src="logo" class="n-avatar-new" />
  <template v-else-if="image">
    <NAvatar v-if="isString(avatar) && avatar.length > 0" :src="avatar" :fallback-src="avatar" class="n-avatar-new" />
    <NAvatar v-else round :src="avatar" class="n-avatar-new" />
  </template>
  <NAvatar v-else round :src="avatar" class="n-avatar-new" /> -->
</template>

<style scoped>
  .n-avatar-new {
    --n-merged-color: white;
  }
</style>
