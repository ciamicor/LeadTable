import { createWebHistory, createRouter } from 'vue-router'
import LeadsList from '@/components/LeadsList.vue'
import CompanyProfile from '@/components/ExhibitorProfile.vue'
import BadgePrint from '@/components/BadgePrint.vue'
import ExpoMap from '@/components/ExpoMap.vue'
import ExpoSelect from '@/components/ExpoSelect.vue'
import LeadAdd from '@/components/LeadAdd.vue'
import BadgeCreate from '@/components/BadgeCreate.vue'
import AttendeesUpload from '@/components/AttendeesUpload.vue'
import CompanyCreate from "@/components/ExhibitorCreate.vue";

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
        name: 'Leadtable',
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
        path: 'exhibitor-registration',
        name: 'Exhibitor Registration',
        component: CompanyCreate,
      },
      /*-| Admin Views |-*/
      /*---+----+---+----+---+----+---+----+---*/
      {
        path: 'admin',
        children: [
          {
            path: 'create-badge',
            name: 'Admin Badge Creator',
            component: BadgeCreate,
          },
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
