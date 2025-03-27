import {createWebHistory, createRouter} from 'vue-router'
import LeadsList from "@/components/LeadsList.vue";
import ScanLead from "@/components/ScanLead.vue";
import FloorPlan from "@/components/FloorPlan.vue";

const routes = [
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
