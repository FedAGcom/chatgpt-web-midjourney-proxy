import { ss } from '@/utils/storage'
import { t } from '@/locales'
const LOCAL_NAME = 'userStorage'

export enum UserRole {
  Admin = 'admin',
  Free = 'free',
  Pro = 'pro',
}

export interface UserInfo {
  avatar: string
  name: string
  description: string
  role: UserRole
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://i.ibb.co/pv3htXH/Neuro-Scribe-Logo.png',
      name: t('mjset.sysname'), // 'AI绘图',
      description: '',
      role: 'admin',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
