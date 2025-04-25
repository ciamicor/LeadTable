import {createWebHistory, createRouter} from 'vue-router'
import LeadsList from '@/components/LeadsList.vue'
import CompanyProfile from '@/components/CompanyProfile.vue'
import BadgePrint from '@/components/BadgePrint.vue'
import ExpoMap from '@/components/ExpoMap.vue'
import ExpoSelect from '@/components/ExpoSelect.vue'
import LeadAdd from '@/components/LeadAdd.vue'
import BadgeCreate from '@/components/BadgeCreate.vue'
import AttendeesUpload from '@/components/AttendeesUpload.vue'
import {useCompanyLocalStore, useExpoLocalStore, useSessionStore} from "@/stores.ts";
import {getUrl_ClientYear} from "@/services/functions/UrlFunc.ts";
import {getExpo_Service} from "@/services/ExpoDataService.ts";

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
    component: ExpoSelect,
  },
  /*-| Expo Users |-*/
  /*---+----+---+----+---+----+---+----+---*/
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
// TODO Add route checker.
/*router.beforeEach(async (to, from) => {
  const sessionStore = useSessionStore()
  const companyLocalData = useCompanyLocalStore()
  const expoLocalData = useExpoLocalStore()
  let url = getUrl_ClientYear()

  let clientMatch = await sessionStore.logged_In === true && expoLocalData.expo_Client !== companyLocalData.expo_Client
  console.log('clientMatch: ', clientMatch)
  let yearMatch = await sessionStore.logged_In === true && expoLocalData.expo_Year !== companyLocalData.expo_Year
  console.log('yearMatch: ', yearMatch)
  if (!clientMatch || !yearMatch) {
    return `/${companyLocalData.expo_Client}/${expoLocalData.expo_Year}/${url.view}`
  }
  await getExpo_Service(url.client, url.year, expoLocalData)

})*/

export default router
