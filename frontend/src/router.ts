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
  /*-| Redirects |-*/
  {
    path: '/profile',
    redirect: '/',
  },
  {
    path: '/leads-list',
    redirect: '/',
  },
  /*-| Routes |-*/
  {
    path: '/',
    component: ExpoSelect,
  },
  {
    path: '/:client/:year/',
    children: [
      {
        path: "",
        component: ExpoMap,
      },
      {
        path: 'leads-list',
        name: 'LeadsList',
        component: LeadsList,
      },
      {
        path: 'scan-lead',
        name: 'LeadAdd',
        component: LeadAdd,
      },
      {
        path: 'floor-plan',
        name: 'ExpoMap',
        component: ExpoMap,
      },
      {
        path: 'profile',
        name: 'CompanyProfile',
        component: CompanyProfile,
      },
      {
        path: 'create-badge',
        name: 'BadgeCreate',
        component: BadgeCreate,
      },
      {
        path: 'admin',
        children: [
          {
            path: 'print-badges',
            name: 'BadgePrint',
            component: BadgePrint
          },
          {
            path: 'upload-attendees',
            name: 'AttendeesUpload',
            component: AttendeesUpload
          }
        ]
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
