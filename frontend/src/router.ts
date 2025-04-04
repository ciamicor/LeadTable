import {createWebHistory, createRouter} from 'vue-router'
import LeadsList from "@/components/LeadsList.vue";
import ScanLead from "@/components/AddLead.vue";
import FloorPlan from "@/components/FloorPlan.vue";
import CompanyProfile from "@/components/CompanyProfile.vue";

const routes = [
  {
    path: '/',
    name: '',
    component: FloorPlan,
  },
  {
    path: '/leads-list',
    name: 'leads-list',
    component: LeadsList,
  },
  {
    path: '/scan-lead',
    name: 'scan-lead',
    component: ScanLead,
  },
  {
    path: '/floor-plan',
    name: 'floor-plan',
    component: FloorPlan,
  },
  {
    path: '/profile',
    name: 'profile',
    component: CompanyProfile,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
