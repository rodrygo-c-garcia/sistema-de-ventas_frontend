import { ref } from 'vue'
import { defineStore} from 'pinia'
import type { User } from '@/views/admin/types'

export const usePinia = defineStore('pinia', () => {
  const user = ref<User | null>(null)

  function changeUser(new_user: User) {
    user.value = new_user
  }

  return { user, changeUser }
})
