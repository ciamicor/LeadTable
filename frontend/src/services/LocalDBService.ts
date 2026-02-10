import { db } from "@/db.ts";
import type { Ref } from "vue";

/*-| Sign Out function is located in SignOut Vue component---+----+---+----+---+----+---+----+---*/

/*-| Save login to Browser Local Storage (Dexie DB)---+----+---+----+---+----+---+----+---*/
export async function saveLogin_LocalDB(
  exId: any,
  name: string,
  loginUrl: string,
  leadRet: boolean,
  expoClient: string,
  expoYear: number,
  status: Ref<string>
) {
  try {
    const id = await db.profile.add({
      id: 1,
      ex_Id: exId || 0,
      name: name,
      login_Url: loginUrl,
      lead_Ret: leadRet,
      expo_Client: expoClient,
      expo_Year: expoYear
    })
    status.value = `${name}
          successfully added. Got id ${id}`
  } catch (error) {
    status.value = `Failed to add
          ${name}: ${error}`
  }
}
