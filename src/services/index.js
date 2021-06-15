import axios from 'axios';
import AuthService from './auth';
import UsersService from './users';
import router from "../router";

const API_ENVS = {
    local : 'http://localhost:3000'
}

const httpClient = axios.create({
    baseURL: API_ENVS.local
});

//para colocar o token do usuário em todas as requisições que a app faz
//como é em toda a requisição fazemos um interceptor de request
//então aqui fazemos algo antes do request acontecer
httpClient.interceptors.request.use(config => {
    const token = window.localStorage.getItem('token')

    //esse bear é pq o back tá assim
    if(token){
        config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
})

//código abaixo é para o axios cuspir os erros corretos da api
//pois os erros 0 e 500 a api nunca vai retornar...
httpClient.interceptors.response.use((response) => response, (error) => {
    const canThrowError = error.status === 0 || error.status === 500;
    if (canThrowError) {
        throw new Error(error.message);
    }

    //se o token não for colocado na mão e não for válido ele retorna 401 ai ele manda o cara para home
    if(error.status === 401){
        router.push({ name: 'Home' });
    }

    return error;
})

export default {
    auth: AuthService(httpClient),
    users: UsersService(httpClient)
}
//chamamos o serviço e passamos o client pra dentro do serviço
// passando dessa forma fica mais fácil testar por que o authService não sabe
//o que está passando pra ele poderia ser fetch ou axios mas ele não sabe o que é
