// db.ts
import Dexie, { type EntityTable } from "dexie"

interface Lead {
  id: number
  expo_Year: number
  expo_Client: string
  attendee_Id: number
  scan_Company_Id: number
  name_First: string
  name_Last: string
  email: string
  phone: string
  employer: string
  score: number
  comment: string
}

interface Company {
  id: number
  ex_Id: number
  name: string
  emailPrivate: string
  login_Url: string
  lead_Ret: boolean
  expo_Year: number
  expo_Client: string
}

interface UserSesh {
  sId: number
  uId: number
  name: string
  email: string
  role: string
}

interface AdminOptions {
  id: number
  clientSelected: string
  yearSelected: number
  lastView: string
}

const db = new Dexie("Leadtable") as Dexie & {
  leads: EntityTable<
    Lead, "id" // primary key "id" (for the typings only)
  >;
  company: EntityTable<
    Company, "id"
  >;
  userSesh: EntityTable<
    UserSesh, "sId"
  >;
  adminOptions: EntityTable<
    AdminOptions, "id"
  >;
}

// Schema declaration:
db.version(3).stores({
  // leads: '++id, year, attendee_Id, scan_Company_Id, name_First, name_Last, email, phone, employer, score, comment',
  // exhibitors: 'id, name',
  company: "id, &ex_Id, name, emailPrivate, login_Url, lead_Ret, expo_Year, expo_Client",
  userSesh: "sId, uId, name, email, role",
  adminOptions: "id, clientSelected, yearSelected, lastView"
})

export type { Lead, Company, UserSesh, AdminOptions }
export { db }
