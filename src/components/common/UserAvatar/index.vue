<script setup lang='ts'>
import { computed } from 'vue'
import { NAvatar } from 'naive-ui'
import { useAppStore, useUserStore } from '@/store'
import defaultAvatarDark from '@/assets/NeuroScribeLogoSmallDark.svg'
import defaultAvatarLight from '@/assets/NeuroScribeLogoSmallLight.svg'
import { isString } from '@/utils/is'

const userStore = useUserStore()

const appStore = useAppStore()

const theme = computed(() => appStore.theme)

const defaultAvatar = computed(() => theme.value === 'dark'
  ? defaultAvatarDark
  : defaultAvatarLight)

const userInfo = computed(() => userStore.userInfo)
</script>

<template>
  <div class="flex items-center overflow-hidden">
    <div class="w-10 h-10 overflow-hidden rounded-full shrink-0" style="display: flex; justify-content: center;">
      <template v-if="isString(userInfo.avatar) && userInfo.avatar.length > 0">
        <!-- <NAvatar
          size="large"
          round
          :src="userInfo.avatar"
          :fallback-src="defaultAvatar"
          class="n-avatar-new "
        /> -->
        <!-- <NAvatar
          size="large"
          round
          src="../../../assets/NeuroScribeLogoSmall.svg"
          :fallback-src="defaultAvatar"
          class="n-avatar-new "
        /> -->
        <img :src="defaultAvatar" alt="">
      </template>
      <template v-else>
        <NAvatar size="large" round :src="defaultAvatar" class="n-avatar-new " />
      </template>
    </div>
    <div class="flex-1 min-w-0 ml-2">
      <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap">
        {{ userInfo.name ?? 'NeuroScribe' }}
      </h2>
      <p class="overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">
        <span
          v-if="isString(userInfo.description) && userInfo.description !== ''"
          v-html="userInfo.description"
        />
      </p>
    </div>
  </div>
</template>

<style scoped>
  .n-avatar-new {
    --n-merged-color: white;
  }
</style>
