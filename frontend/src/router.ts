import { createWebHashHistory, createRouter } from 'vue-router'
import LeadsList from '@/components/LeadsList.vue'
import ScanLead from '@/components/AddLead.vue'
import FloorPlan from '@/components/FloorPlan.vue'
import CompanyProfile from '@/components/CompanyProfile.vue'
import QrCodes from './components/QrCodes.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: FloorPlan
  },
  {
    path: '/leads-list',
    name: 'leads-list',
    component: LeadsList
  },
  {
    path: '/scan-lead',
    name: 'scan-lead',
    component: ScanLead
  },
  {
    path: '/floor-plan',
    name: 'floor-plan',
    component: FloorPlan
  },
  {
    path: '/profile',
    name: 'profile',
    component: CompanyProfile
  },
  {
    path: '/print-badges',
    name: 'print-badges',
    component: QrCodes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
