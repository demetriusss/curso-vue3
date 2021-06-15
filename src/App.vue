<template>
  <modal-factory />
  <router-view />
</template>

<script>
import ModalFactory from './components/ModalFactory'
import services from './services'
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";

export default {
  components : { ModalFactory },
  setup (){
    const router = useRouter(); //para ações - Ex: mover para outra página
    const route = useRoute(); //para pegar informações das rotas

    //esse watch fica escutando as mudanças de uma variável que no caso tem as informações rota
    //quando essa variavel mudar ele executa esse segunda função do segundo parâmetro
    watch(() => route.path, async () => {
      if(route.meta.hasAuth) {

        const token = window.localStorage.getItem('token');

        if(!token){
          router.push({ name: 'Home' })
          return
        }

        const { data } = await services.users.getMe();
        console.log('data', data);

      }
    })
  }
}
</script>
