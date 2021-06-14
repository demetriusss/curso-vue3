<template>
  <div class="flex justify-between">
    <h1 class="text-2xl font-black text-gray-800">Entre na sua conta</h1>

    <button @click="close" class="text-2xl text-gray-600 focus:outline-none">X</button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit"></form>
    <label class="block">
      <span class="text-lg font-medium text-gray-800">E-mail</span>
      <input
          v-model="state.email.value"
          type="email"
          :class="{'border-brand-danger' : !!state.email.errorMessage}"
          class="block w-full px4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="teste@gmail.com">
    </label>
    <span
        v-if="!!state.email.errorMessage"
        class="block font-medium text-brand-danger">
        {{state.email.errorMessage}}
    </span>
    <label class="block">
      <span class="text-lg font-medium text-gray-800">Senha</span>
      <input
          v-model="state.password.value"
          type="password"
          :class="{'border-brand-danger' : !!state.password.errorMessage}"
          class="block w-full px4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded">
    </label>
    <span
        v-if="!!state.password.errorMessage"
        class="block font-medium text-brand-danger">
        {{state.password.errorMessage}}
    </span>

    <button :disabled="state.isLoading" type="submit"
            @click="handleSubmit"
            :class="{'opacity-50' : state.isLoading}"
            class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150">
      Entrar
    </button>
  </div>
</template>

<script>
  import {reactive} from 'vue'
  import { useField } from 'vee-validate'
  import useModal from '../../../hooks/useModal'
  import { validateEmptyAndLength3, validateEmptyAndEmail } from "../../../utils/validators";
  import services from '../../../services';
  import { useRouter } from "vue-router";
  import { useToast } from 'vue-toastification';

  export default {
    setup(){
      const modal = useModal();
      const router = useRouter();
      const toast = useToast();

      const {
        value: emailValue,
        errorMessage : emailErrorMessage
      } = useField('email', validateEmptyAndEmail )

      const {
        value: passwordValue,
        errorMessage : passwordErrorMessage
      } = useField('password', validateEmptyAndLength3)

      const state = reactive({
        hasErrors: false,
        isLoading: false,
        email:{
          value: emailValue,
          errorMessage: emailErrorMessage,
        },
        password:{
          value: passwordValue,
          errorMessage: passwordErrorMessage
        }
      });

      async function handleSubmit(){
        try {
          toast.clear();
          state.isLoading = true;
          const { data, errors } = await services.auth.login({
            email: state.email.value,
            password: state.password.value
          })

          if (!errors) {
            window.localStorage.setItem('token', data.token);
            router.push({ name: 'FeedBacks' });
            state.isLoading = false;
            modal.close();
            return
          }

          if(errors.status === 404){
            toast.error('E-mail não encontrato');
          }

          if(errors.status === 401){
            toast.error('E-mail/senha inválidos.');
          }

          if(errors.status === 400){
            toast.error('Ocorreu um erro ao fazer o login.');
          }

          state.isLoading = false;

        } catch (error){
          state.isLoading = false;
          state.hasErrors = !!error;
          toast.error('Ocorreu um erro ao fazer login.');
        }
      }

      return {state, handleSubmit, close: modal.close}
    }
  }
</script>
