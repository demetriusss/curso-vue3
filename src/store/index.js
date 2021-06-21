import { readonly } from 'vue';
import UserModule from './user';
import GlobalModule from './global';

//readOnly é para ler o estado sem alterar ele, por que usa o readyOnly
//e se quiser alterar tem que usar as funções que alteram o estado dentro do módulo
export default readonly({
    User: UserModule,
    Global: GlobalModule
})