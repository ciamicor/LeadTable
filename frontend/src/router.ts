import { createWebHistory, createRouter } from "vue-router"
import LeadsList from "@/components/leads/LeadsList.vue"
import CompanyProfile from "@/components/exhibitor/ExhibitorProfile.vue";
import ExpoMap from "@/components/elements/ExpoMap.vue"
import ExpoSelect from "@/components/ExpoSelect.vue"
import LeadAdd from "@/components/leads/LeadAdd.vue"
import BadgeCreate from "@/components/BadgeCreate.vue"
import BadgePrintQuickfix from "@/components/admin/BadgePrintQuickfix.vue";

/*-| admin |-*/
import UserLogin from "@/components/admin/User_Login.vue";
import Admin_View from "@/components/admin/Admin_View.vue";
import BadgePrint from "@/components/admin/dashboard-views/Admin_BadgePrint.vue"
import AttendeesUpload from "@/components/admin/dashboard-views/Admin_AttendeesUpload.vue"
import Admin_ExpoManage from "@/components/admin/dashboard-views/Admin_ExpoManage.vue";
import Admin_BadgePrint from "@/components/admin/dashboard-views/Admin_BadgePrint.vue";
import Admin_UsersManage from "@/components/admin/dashboard-views/Admin_UsersManage.vue";
import Admin_Dashboard from "@/components/admin/dashboard-views/Admin_Dashboard.vue";
import CompanyCreate from "@/components/exhibitor/ExhibitorCreate.vue";
import { authClient } from "@/lib/auth-client.ts";
import Admin_AttendeesManage from "@/components/admin/dashboard-views/Admin_AttendeesManage.vue"

const routes = [
  /*-| Redirects |-*/
  /*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/
  {
    path: "/profile",
    redirect: "/"
  },
  {
    path: "/leads-list",
    redirect: "/"
  },
  {
    path: "/",
    name: "Select Expo",
    component: ExpoSelect
  },

  {
    path: "/login",
    name: "Login",
    component: UserLogin
  },

  /*-| Admin
  ---+----+---+----+---+----+---+----+---*/
  {
    path: "/admin",
    component: Admin_View,
    beforeEnter: async (to: any, from: any) => {
      const sesh = await authClient.getSession()
      console.log(sesh)
      // @ts-ignore
      if (sesh.data !== null && sesh.data.user.role === "admin") {
        console.log("You're an admin")
        return true
      }
      else {
        console.log("Oops. You're not an admin.")
        return {name: "Login"}
      }
    },
    children: [
      {
        path: "",
        name: "Admin Dashboard",
        component: Admin_Dashboard
      },
      {
        path: "manage-expo",
        name: "Manage Expo",
        component: Admin_ExpoManage
      },
      {
        path: "manage-attendees",
        name: "Manage Attendees",
        component: Admin_AttendeesManage
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
    path: "/:client/:year/",
    redirect: {name: "Booth Map"},
    children: [
      {
        path: "leads-list",
        name: "Lead Table",
        component: LeadsList
      },
      {
        path: "scan-lead",
        name: "Add a Lead",
        component: LeadAdd
      },
      {
        path: "floor-plan",
        name: "Booth Map",
        component: ExpoMap
      },
      {
        path: "profile",
        name: "Company Profile",
        component: CompanyProfile
      },
      {
        path: "create-badge",
        name: "Create a Badge",
        component: BadgeCreate
      },
      {
        path: "register",
        name: "Registration",
        component: BadgeCreate
      },
      {
        path: "exhibitor-registration",
        name: "Company Registration",
        component: CompanyCreate
      },
      /*-| Admin Views |-*/
      /*---+----+---+----+---+----+---+----+---*/
      {
        path: "admin",
        children: [
          {
            path: "create-badge",
            name: "Admin Badge Creation",
            component: BadgeCreate
          },
          {
            path: "print-badges",
            name: "Print Badges",
            component: BadgePrint
          },
          {
            path: "print-badges-quickfix",
            name: "Badge Print Quickfix",
            component: BadgePrintQuickfix
          },
          {
            path: "upload-attendees",
            name: "Upload Attendees",
            component: AttendeesUpload
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
