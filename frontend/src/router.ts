import { createWebHistory, createRouter } from 'vue-router'
import LeadsList from '@/components/leads/LeadsList.vue'
import ExhibitorProfile from "@/components/exhibitor/ExhibitorProfile.vue";
import ExpoMap from '@/components/elements/ExpoMap.vue'
import ExpoSelect from '@/components/ExpoSelect.vue'
import LeadAdd from '@/components/leads/LeadAdd.vue'
import BadgeCreate from '@/components/BadgeCreate.vue'

/*-| admin |-*/
import Admin_Login from "@/components/admin/Admin_Login.vue";
import Admin_View from "@/components/admin/Admin_View.vue";
import BadgePrint from '@/components/admin/dashboard-views/Admin_BadgePrint.vue'
import AttendeesUpload from '@/components/admin/dashboard-views/Admin_AttendeesUpload.vue'
import Admin_ExpoManage from "@/components/admin/dashboard-views/Admin_ExpoManage.vue";
import Admin_BadgePrint from "@/components/admin/dashboard-views/Admin_BadgePrint.vue";
import Admin_UsersManage from "@/components/admin/dashboard-views/Admin_UsersManage.vue";
import Admin_Dashboard from "@/components/admin/dashboard-views/Admin_Dashboard.vue";
import CompanyCreate from "@/components/exhibitor/ExhibitorCreate.vue";

/*-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===
-| Routes
-|===!===!===!===!===!===!===!===!===!===!===!===!===!===!===/*/
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

  /*-| admin
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
        name: 'Exhibitor Profile',
        component: ExhibitorProfile,
      },
      {
        path: 'create-badge',
        name: 'Create a Badge',
        component: BadgeCreate,
      },
      {
        path: 'exhibitor-registration',
        name: 'exhibitor Registration',
        component: CompanyCreate,
      },
      /*-| admin Views |-*/
      /*---+----+---+----+---+----+---+----+---*/
      {
        path: 'admin',
        children: [
          {
            path: 'create-badge',
            name: 'Admin Badge Creation',
            component: BadgeCreate,
          },
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
