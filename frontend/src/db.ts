// db.ts
import Dexie, {type EntityTable} from 'dexie';

interface Lead {
  id: number
  expo_Year: number
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
  expo_Year: string
  name: string
  ex_Id: number
  login_Url: string
  lead_Ret: boolean
}

const db = new Dexie('LeadsDB') as Dexie & {
  leads: EntityTable<
    Lead,
    'id' // primary key "id" (for the typings only)
  >;
  profile: EntityTable<
    Profile,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  // leads: '++id, expo_Year, attendee_Id, scan_Company_Id, name_First, name_Last, email, phone, employer, score, comment',
  // exhibitors: 'id, name',
  profile: '++id, &ex_Id, name, login_Url, lead_Ret, expo_Year'
});

export type {Lead};
export {db};
