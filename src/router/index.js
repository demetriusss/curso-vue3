import { createRouter, createWebHistory } from 'vue-router'

//fazendo o import dessa forma ele somente carrega o componente
//quando chamamos a rota

const Home = () => import('../views/Home');
const FeedBacks = () => import('../views/FeedBacks');
const Credentials = () => import('../views/Credentials');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feedbacks',
    name: 'FeedBacks',
    component: FeedBacks,
    meta:{
      necessitaAuth: true
    }
  },{
    path: '/credentials',
    name: 'Credentials',
    component: Credentials,
    meta: {
      necessitaAuth: true
    }
  },{
    //esse meta é para passar dados para navegar junto das rotas...
    //nesse caso se tentarmos acessar a home vai ser false...
    path: '/:pathMatch(.*)*',
    redirect: {name: 'Home'}
    //aqui encima é quando não cai em nenhuma rota ele redireciona para a raiz do site
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
