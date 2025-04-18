import {createWebHistory, createRouter} from 'vue-router'
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
    component: ExpoSelect
  },
  {
    path: '/:client/:year/',
    children: [
      {
        path: 'leads-list',
        component: LeadsList,
      },
      {
        path: 'scan-lead',
        component: LeadAdd,
      },
      {
        path: 'floor-plan',
        component: ExpoMap,
      },
      {
        path: 'profile',
        component: CompanyProfile,
      },
      {
        path: 'create-badge',
        component: BadgeCreate,
      },
    ]
  },
  {
    path: '/admin/print-badges',
    component: BadgePrint
  },
  {
    path: '/admin/upload-attendees',
    component: AttendeesUpload
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
