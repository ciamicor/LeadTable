import { createWebHistory, createRouter } from 'vue-router'
import LeadsList from '@/components/LeadsList.vue'
import CompanyProfile from '@/components/CompanyProfile.vue'
import ExpoMap from '@/components/Elements/ExpoMap.vue'
import ExpoSelect from '@/components/ExpoSelect.vue'
import LeadAdd from '@/components/LeadAdd.vue'
import BadgeCreate from '@/components/BadgeCreate.vue'

/*-| Admin |-*/
import Admin_Login from "@/components/Admin/Admin_Login.vue";
import Admin_View from "@/components/Admin/Admin_View.vue";
import BadgePrint from '@/components/Admin/Dashboard_Views/Admin_BadgePrint.vue'
import AttendeesUpload from '@/components/Admin/Dashboard_Views/Admin_AttendeesUpload.vue'
import Admin_ExpoManage from "@/components/Admin/Dashboard_Views/Admin_ExpoManage.vue";
import Admin_BadgePrint from "@/components/Admin/Dashboard_Views/Admin_BadgePrint.vue";
import Admin_UsersManage from "@/components/Admin/Dashboard_Views/Admin_UsersManage.vue";
import Admin_Dashboard from "@/components/Admin/Dashboard_Views/Admin_Dashboard.vue";

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
    name: 'Select Expo',
    component: ExpoSelect,
  },

  /*-| Admin
  ---+----+---+----+---+----+---+----+---*/
// TODO make admin parent to client, year
  {
    path: '/admin-login',
    name: 'Admin Login',
    component: Admin_Login,
  },
  {
    path: '/admin/',
    component: Admin_View,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Admin_Dashboard
      },
      {
        path: "manage-expo",
        name: "Manage Expo",
        component: Admin_ExpoManage
      },
      {
        path: "badges",
        name: "Badges",
        component: Admin_BadgePrint
      },
      {
        path: "users",
        name: "Users",
        component: Admin_UsersManage
      }
    ]
  },
  /*-| Expo Users
  ---+----+---+----+---+----+---+----+---*/
  {
    path: '/:client/:year/',
    children: [
      {
        path: "",
        name: "Booth Map",
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
        path: 'print-badges',
        name: 'Print Badges',
        component: BadgePrint
      },
      {
        path: 'upload-attendees',
        name: 'Upload Attendees',
        component: AttendeesUpload
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
/*router.beforeEach((to, from) => {
  /!*-| Reroute when 'undefined' |-*!/
  if ((to.params.client === 'undefined' || to.params.year === 'undefined' && to.name !== 'ExpoSelect') && to.name !== 'ExpoSelect') {
    return {name: 'ExpoSelect'}
  }
})*/

export default router
