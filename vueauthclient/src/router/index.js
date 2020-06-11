import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Cadastro from '@/components/Cadastro'
import Prestadores from '@/components/Prestadores'
import CadastroPrestador from '@/components/CadastroPrestador'
import CadastroCategoria from '@/components/CadastroCategoria'
import SolicitarServico from '@/components/SolicitarServico'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastro
    },
    {
      path: '/prestadores',
      name: 'Prestadores',
      component: Prestadores
    },
    {
      path: '/cadastro/prestador',
      name: 'CadastroPrestador',
      component: CadastroPrestador
    },
    {
      path: '/cadastro/categoria',
      name: 'CadastroCategoria',
      component: CadastroCategoria
    },
    {
      path: '/servico/solicitar',
      name: 'SolitarServico',
      component: SolicitarServico
    }
  ]
})
