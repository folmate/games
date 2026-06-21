import { createRouter, createWebHashHistory } from 'vue-router'
import RoleAssignment from '../views/RoleAssignment.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: RoleAssignment },
  ],
})
