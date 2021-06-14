<template>
  <div class="flex justify-between">
    <h1 class="text--4xl font-black text-gray-800">
      Crie sua conta
    </h1>
    <button class="text-4xl text-gray-600" @click="">
      &times;
    </button>
  </div>
</template>

<script>
  import {reactive} from 'vue'
  import useModal from '../../../hooks/useModal'

  export default {
    setup(){
      const modal = useModal()
      const state = reactive({
        hasErrors: false,
        isLoading: false,
        email:{
          value: '',
          errorMessage: '',
        }
      })

      return {state}
    }
  }
</script>