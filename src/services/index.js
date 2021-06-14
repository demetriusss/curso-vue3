import axios from 'axios';
import AuthService from './auth';

const API_ENVS = {
    local : 'http://localhost:3000'
}

const httpClient = axios.create({
    baseURL: API_ENVS.local
});

//código abaixo é para o axios cuspir os erros corretos da api
//pois os erros 0 e 500 a api nunca vai retornar...
httpClient.interceptors.response.use((response) => response, (error) => {
    const canThrowError = error.request.status === 0 || error.request.status === 500;
    if (canThrowError) {
        throw new Error(error.message);
    }
    return error;
})

export default { auth: AuthService(httpClient)}
//chamamos o serviço e passamos o client pra dentro do serviço
// passando dessa forma fica mais fácil testar por que o authService não sabe
//o que está passando pra ele poderia ser fetch ou axios mas ele não sabe o que é
