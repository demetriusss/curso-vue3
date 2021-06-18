<template>
  <!--
    esse teleport é para mandar esse componente diretamente para o body quando ele for montado
    então quando você chamar ele pra dentro de onde você quiser
    nesse to poderia ser qualquer seletor até #app
   -->
  <teleport to="body">
    <div v-if="state.isActive"
        class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <!-- esse click.stop é para parar a propagação de eventos -->
      <div class="fixed mx-10" :class="state.width" @click.stop>
        <div class="flex flex-col overflow-hidden bg-white rounded-lg">
          <div class="flex flex-col px-12 py-10 bg-white">
            <!-- esse is recebe o componente que você quer abrir,
                 quando o componente for aberto essa tag component vai se transformar no componente
                 assim nós podemos trazer qualquer conteúdo pra dentro desse modal
            -->
            <component :is="state.component" />
          </div>
        </div>
      </div>

    </div>
  </teleport>
</template>

<script>

import { defineAsyncComponent, onBeforeUnmount, onMounted, reactive } from 'vue';
import useModal from '../../hooks/useModal';

  const JanelaLogin = defineAsyncComponent(() => import('./ModalLogin'));
  const JanelaCriacaoDeConta = defineAsyncComponent(() => import('./ModalCreateAccount'));

  const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3';

  export default {

    //essas declarações são para a tag componente is funcionar...
    components: { JanelaLogin, JanelaCriacaoDeConta },

    setup(){

      //para colocamos os componentes de modal dinamicamente
      const state = reactive({
        isActive: false,
        component: {},
        props: {},
        nome: "",
        width: DEFAULT_WIDTH
      });

      //chamamos o emissor de eventos
      const modal = useModal();

      //ficamos escutando o evento quando o componente é montado
      onMounted(() => {
        modal.listen(handleModalToogle);
      })

      //antes do componente ser desmontado desligamos o ouvinte dos eventos
      onBeforeUnmount(() => {
        modal.off(handleModalToogle);
      });

      function handleModalToogle(payLoad) {

        if (payLoad.isActive) {
          state.component = payLoad.component;
          state.props = payLoad.props;
          state.width = payLoad.width ?? DEFAULT_WIDTH;
        } else {
          //somente para não montar um modal com as configurações do antigo
          state.component = {};
          state.props = {};
          state.width = DEFAULT_WIDTH;
        }
        state.isActive = payLoad.isActive;
      }

      //tudo que vai ser usado no template deve ser retornado
      return {state, handleModalToogle}
    }
  }
</script>