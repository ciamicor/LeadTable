import {createWebHistory, createRouter} from 'vue-router'
import LeadsList from "@/components/LeadsList.vue";
import LeadEdit from "@/components/LeadEdit.vue";
import AddLead from "@/components/AddLead.vue";

const routes = [
  {
    path: '/leads-list',
    name: 'leads-list',
    component: LeadsList,
  },
  {
    path: '/lead-edit',
    name: 'lead-edit',
    component: LeadEdit,
  },
  {
    path: '/add-lead',
    name: 'add-lead',
    component: AddLead,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
