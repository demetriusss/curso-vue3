<template>
  <!-- esses com arroba são eventos customizados que serão criados lá no componente cabecalho
       quando o header emitir esse evento nós faremos a função de login aqui no index
       esse nome de evento deve ser o mesmo nome lá no emit do componente
   -->
  <cabecalho @create-account="handleAccountCreate" @login="handleLogin"></cabecalho>
  <contato />

  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">FeedBacker @ 2021</p>
  </div>
</template>

<script>
import Cabecalho from './CustomHeader.vue'
import Contato from './Contact.vue'
import { onMounted } from "vue";
import { useRouter } from 'vue-router'
import useModal from '../../hooks/useModal'

const components = { Cabecalho, Contato };

function setup() {

  const router = useRouter()
  const modal = useModal() //no vue 2 era possível fazer this.$router.push mas no vu3 usamos hooks pra isso

  //quando o componente for montado..., caso tenha o token no localstorage ele redireciona para feedback
  onMounted(() => {
    const token = localStorage.getItem('token');
    if(token){
      router.push({ name: 'FeedBacks' });
    }
  })

  function handleLogin() {
    modal.open({
      component: 'JanelaLogin'
    });
  }

  function handleAccountCreate(){
    modal.open({
      component: 'JanelaCriacaoDeConta'
    });
  }

  //esse return é pra você comseguir usar essas funções lá encima no template
  return {handleLogin, handleAccountCreate};
}

export default {components, setup};
</script>
