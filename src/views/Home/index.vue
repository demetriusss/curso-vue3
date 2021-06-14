<template>
  <!-- esses com arroba são eventos customizados que serão criados lá no componente header
       quando o header emitir esse evento nós faremos a função de login aqui no index
   -->
  <custom-header @create-account="handleAccountCreate" @login="handleLogin"></custom-header>
  <contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">FeedBacker @ 2021</p>
  </div>
</template>

<script>
import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'
import {onMounted} from "vue";
import {useRouter} from 'vue-router'
import useModal from '../../hooks/useModal'

export default {
  components: { CustomHeader, Contact},
  setup() {

    const router = useRouter()
    const modal = useModal()

    //quando o componente for montado...
    onMounted(() => {
      const token = localStorage.getItem('token')
      if(token){
        router.push({ name: 'FeedBacks' })
      }
    })

    function handleLogin() {
      modal.open({
        component: 'ModalLogin'
      })
    }

    function handleAccountCreate(){
      modal.open({
        component: 'ModalCreateAccount'
      })
    }

    return {handleLogin, handleAccountCreate}
  }
}
</script>
