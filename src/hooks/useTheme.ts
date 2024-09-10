import type { GlobalThemeOverrides } from 'naive-ui'
import { computed, watch } from 'vue'
import { darkTheme, useOsTheme } from 'naive-ui'
import { useAppStore } from '@/store'

export function useTheme() {
  const appStore = useAppStore()

  const OsTheme = useOsTheme()

  const isDark = computed(() => {
    if (appStore.theme === 'auto')
      return OsTheme.value === 'dark'
    else
      return appStore.theme === 'dark'
  })

  const theme = computed(() => {
    return isDark.value ? darkTheme : undefined
  })

  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    if (isDark.value) {
      return {
        common: {
          // Общие стили для всех компонентов в тёмной теме
        },
        Button: {
          textColorHover: '#126eb0',
          borderFocus: '2px solid #126eb0',
          borderHover: '2px solid #126eb0',
          borderPressedSuccess: '#126eb0',
          textColorFocus: '#126eb0',
          borderPressed: '2px solid #126eb0',
          textColorPressed: '#126eb0',

          // disabled
          colorDisabledPrimary: '#126eb0',
          borderDisabledPrimary: '1px solid #126eb0',

          // primary
          colorPrimary: '#126eb0',
          borderPrimary: 'transparent',
          colorHoverPrimary: '#126eb0',
          textColorHoverPrimary: '#fff',
          colorFocusPrimary: '#126eb0',
          borderFocusPrimary: '2px solid #126eb0',
          borderHoverPrimary: '2px solid #126eb0',
          borderFocusPrimaryPrimary: '#126eb0',
          borderPressedSuccessPrimary: '#126eb0',
          textColorFocusPrimary: '#fff',
          borderPressedPrimary: '2px solid #126eb0',
          textColorPressedPrimary: '#126eb0',

          // text only
          textColorTextPrimary: '#126eb0',
          textColorTextHoverPrimary: '#126eb0',

          // в диалогах
          colorWarning: '#126eb0',
          colorHoverWarning: '#126eb0',
          textColorHoverWarning: '#fff',
          borderWarning: '#126eb0',
          borderHoverWarning: '1px solid #126eb0',
          textColorGhostHover: '#126eb0',
        },
        Input: {
          borderHover: '2px solid #126eb0',
          borderFocus: '2px solid #126eb0',
        },
        Tabs: {
          barColor: '#126eb0',
          tabTextColorHoverLine: '#126eb0',
          tabTextColorActiveLine: '#126eb0',
        },
        InternalSelection: {
          borderHover: '2px solid #126eb0',
          borderActive: '2px solid #126eb0',
          borderFocus: '2px solid #126eb0',
        },
        InternalSelectMenu: {
          optionTextColorActive: '#126eb0',
          optionCheckColor: '#126eb0',
        },
        Slider: {
          fillColor: '#126eb0',
          fillColorHover: '#126eb0',
        },
        Switch: {
          railColorActive: '#126eb0',
        },
        Dialog: {
          iconColorWarning: '#126eb0',
        },
        Popconfirm: {
          iconColor: '#126eb0',
        },
        Tag: {
          borderSuccess: '1px solid #126eb0',
          textColorSuccess: '#126eb0',
          colorSuccess: 'rgba(18, 110, 176, 0.1)',

          // primary
          colorPrimary: 'rgba(18, 110, 176, 0.1)',
          textColorPrimary: '#126eb0',

          // кол-во символов
          // colorInfo: 'red',
        },
      }
    }
    else {
      return {
        common: {
          // Общие стили для всех компонентов в светлой теме
        },
        Button: {
          textColorHover: '#126eb0',
          borderFocus: '2px solid #126eb0',
          borderHover: '2px solid #126eb0',
          borderPressedSuccess: '#126eb0',
          textColorFocus: '#126eb0',
          borderPressed: '2px solid #126eb0',
          textColorPressed: '#126eb0',

          // disabled
          colorDisabledPrimary: '#126eb0',
          borderDisabledPrimary: '1px solid #126eb0',

          // primary
          colorPrimary: '#126eb0',
          borderPrimary: 'transparent',
          colorHoverPrimary: '#126eb0',
          textColorHoverPrimary: '#fff',
          colorFocusPrimary: '#126eb0',
          borderFocusPrimary: '2px solid #126eb0',
          borderHoverPrimary: '2px solid #126eb0',
          borderFocusPrimaryPrimary: '#126eb0',
          borderPressedSuccessPrimary: '#126eb0',
          textColorFocusPrimary: '#fff',
          borderPressedPrimary: '2px solid #126eb0',
          textColorPressedPrimary: '#126eb0',

          // text only
          textColorTextPrimary: '#126eb0',
          textColorTextHoverPrimary: '#126eb0',

          // в диалогах
          colorWarning: '#126eb0',
          colorHoverWarning: '#126eb0',
          textColorHoverWarning: '#fff',
          borderWarning: '#126eb0',
          borderHoverWarning: '1px solid #126eb0',
          textColorGhostHover: '#126eb0',
        },
        Input: {
          borderHover: '2px solid #126eb0',
          borderFocus: '2px solid #126eb0',
        },
        Tabs: {
          barColor: '#126eb0',
          tabTextColorHoverLine: '#126eb0',
          tabTextColorActiveLine: '#126eb0',
        },
        InternalSelection: {
          borderHover: '2px solid #126eb0',
          borderActive: '2px solid #126eb0',
          borderFocus: '2px solid #126eb0',
        },
        InternalSelectMenu: {
          optionTextColorActive: '#126eb0',
          optionCheckColor: '#126eb0',
        },
        Slider: {
          fillColor: '#126eb0',
          fillColorHover: '#126eb0',
        },
        Switch: {
          railColorActive: '#126eb0',
        },
        Dialog: {
          iconColorWarning: '#126eb0',
        },
        Popconfirm: {
          iconColor: '#126eb0',
        },
        Tag: {
          borderSuccess: '1px solid #126eb0',
          textColorSuccess: '#126eb0',
          colorSuccess: 'rgba(18, 110, 176, 0.1)',

          // primary
          colorPrimary: 'rgba(18, 110, 176, 0.1)',
          textColorPrimary: '#126eb0',

          // кол-во символов
          // colorInfo: 'red',
        },
      }
    }
  })

  watch(
    () => isDark.value,
    (dark) => {
      if (dark)
        document.documentElement.classList.add('dark')
      else
        document.documentElement.classList.remove('dark')
    },
    { immediate: true },
  )

  return { theme, themeOverrides }
}
