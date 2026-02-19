// db.ts
import Dexie, { type EntityTable } from 'dexie'

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

interface Profile {
  id: number
  ex_Id: number
  name: string
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

const db = new Dexie('Leadtable') as Dexie & {
  leads: EntityTable<
    Lead, 'id' // primary key "id" (for the typings only)
  >;
  profile: EntityTable<
    Profile, 'id'
  >;
  userSesh: EntityTable<
    UserSesh, 'sId'
  >
}

// Schema declaration:
db.version(3).stores({
  // leads: '++id, year, attendee_Id, scan_Company_Id, name_First, name_Last, email, phone, employer, score, comment',
  // exhibitors: 'id, name',
  profile: 'id, &ex_Id, name, login_Url, lead_Ret, expo_Year, expo_Client',
  userSesh: 'sId, uId, name, email, role'
})

export type { Lead, Profile, UserSesh }
export { db }
