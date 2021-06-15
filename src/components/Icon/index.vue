<template>
  <component :is="name" v-bind="$props" />
</template>

<script>

//essa prop nos receberemos do componente de cima
//por isso que se nós chamamos esse componente passando a prop
//com o nome escrito loading ele vai chamar o componente loading
//lá no componente is, esse v-bind é para passar as props entre os componentes

import Loading from './Loading.vue';

  export default {

    components: { Loading },

    props: {
      name: { type: String, required: true }
    }
  }
</script>