import { ref } from 'vue'
import { defineStore} from 'pinia'
import type { User } from '@/views/admin/types'
import type { Cliente } from '@/views/admin/types'

export const usePinia = defineStore('pinia', () => {
  const user = ref<User | null>(null)
  const customer = ref<Cliente | null>(null)

  // funcion para asignar el usuario
  function changeUser(new_user: User) {
    user.value = new_user
  }

  //funcion para asignar el cliente
  function changeCustomer(new_customer: Cliente) {
    customer.value = new_customer
  }

  return { user, customer, changeUser, changeCustomer }
})
