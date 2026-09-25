// db.ts
import Dexie, { type EntityTable } from "dexie"

interface Leads {
  id: number
  synced: boolean
  expo_Client: string
  expo_Year: number
  attendee_Id: number
  scan_Company_Id: number
  name_First: string
  name_Last: string
  title: string
  employer: string
  email: string
  phone: string
  address_Line1: string
  address_Line2: string
  address_City: string
  address_State: string
  address_Zip: string
  address_Country: string
  score: number
  comment: string
  createdAt: Date
  updatedAt: Date
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

export const db = new Dexie("Leadtable") as Dexie & {
  leads: EntityTable<
    Leads,
    "id" // primary key "id" (for the typings only)
  >;
  profile: EntityTable<
    Profile,
    "id" // primary key "id" (for the typings only)
  >;
}

// Schema declaration:
db.version(5).stores({
  // exhibitors: 'id, name',
  profile: "id, &ex_Id, name, login_Url, lead_Ret, expo_Year, expo_Client",
  leads: "id,synced,expo_Client,expo_Year,attendee_Id,scan_Company_Id,name_First,name_Last,title,employer,email,phone,address_Line1,address_Line2,address_City,address_State,address_Zip,address_Country,score,comment,createdAt,updatedAt"
})
export type { Leads, Profile };
