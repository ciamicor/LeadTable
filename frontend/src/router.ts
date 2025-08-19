import {createWebHistory, createRouter} from 'vue-router'
import LeadsList from '@/components/LeadsList.vue'
import CompanyProfile from '@/components/CompanyProfile.vue'
import BadgePrint from '@/components/BadgePrint.vue'
import ExpoMap from '@/components/ExpoMap.vue'
import ExpoSelect from '@/components/ExpoSelect.vue'
import LeadAdd from '@/components/LeadAdd.vue'
import BadgeCreate from '@/components/BadgeCreate.vue'
import AttendeesUpload from '@/components/AttendeesUpload.vue'

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Routes |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

const routes = [
  /*-| Redirects |-*/
  /*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
  {
    path: '/profile',
    redirect: '/',
  },
  {
    path: '/leads-list',
    redirect: '/',
  },
  /*-| Routes |-*/
  /*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
  {
    path: '/',
    name: 'ExpoSelect',
    component: ExpoSelect,
  },
  /*-| Expo Users |-*/
  /*---+----+---+----+---+----+---+----+---*/
  {
    path: '/:client/:year/',
    children: [
      {
        path: "",
        name: "ExpoMap",
        component: ExpoMap,
      },
      {
        path: 'leads-list',
        name: 'Lead Table',
        component: LeadsList,
      },
      {
        path: 'scan-lead',
        name: 'Add a Lead',
        component: LeadAdd,
      },
      {
        path: 'floor-plan',
        name: 'Booth Map',
        component: ExpoMap,
      },
      {
        path: 'profile',
        name: 'Company Profile',
        component: CompanyProfile,
      },
      {
        path: 'create-badge',
        name: 'Create a Badge',
        component: BadgeCreate,
      },
      /*-| Admin Views |-*/
      /*---+----+---+----+---+----+---+----+---*/
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

/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Check Check Check |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
router.beforeEach((to, from) => {
  /*-| Reroute when 'undefined' |-*/
  if ((to.params.client === 'undefined' || to.params.year === 'undefined' && to.name !== 'ExpoSelect') && to.name !== 'ExpoSelect') {
    return {name: 'ExpoSelect'}
  }
})

export default router
