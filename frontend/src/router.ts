import { createWebHistory, createRouter } from 'vue-router'
import LeadsList from '@/components/LeadsList.vue'
import CompanyProfile from '@/components/CompanyProfile.vue'
import BadgePrint from '@/components/BadgePrint.vue'
import ExpoMap from '@/components/ExpoMap.vue'
import ExpoSelect from '@/components/ExpoSelect.vue'
import LeadAdd from '@/components/LeadAdd.vue'
import BadgeCreate from '@/components/BadgeCreate.vue'
import AttendeesUpload from '@/components/AttendeesUpload.vue'

const routes = [
  {
    path: '/',
    name: '',
    component: ExpoSelect
  },
  {
    path: '/leads-list',
    name: 'leads-list',
    component: LeadsList
  },
  {
    path: '/scan-lead',
    name: 'scan-lead',
    component: LeadAdd
  },
  {
    path: '/floor-plan',
    name: 'floor-plan',
    component: ExpoMap
  },
  {
    path: '/profile',
    name: 'profile',
    component: CompanyProfile
  },
  {
    path: '/print-badges',
    name: 'print-badges',
    component: BadgePrint
  },
  {
    path: '/create-badge',
    name: 'create-badge',
    component: BadgeCreate
  },
  {
    path: '/upload-attendees',
    name: 'upload-attendees',
    component: AttendeesUpload
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
