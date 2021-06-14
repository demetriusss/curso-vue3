import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home';
import FeedBacks from '../views/FeedBacks';
import Credentials from '../views/Credentials';

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
      autenticacao: true
    }
  },{
    path: '/credentials',
    name: 'Credentials',
    component: Credentials,
    meta: {
      autenticacao: true
    }
  },{
    //aqui é quando não cai em nenhuma rota ele redireciona para a raiz do site
    path: '/:pathMatch(.*)*',
    redirect: {name: 'Home'}
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
