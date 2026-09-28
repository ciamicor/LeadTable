/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Sort Attendees/Leads |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

// By first name
export async function sortLName_Service(i: Array<{}>) {
  i.sort((
    a: any,
    b: any
  ) => {
    const nameA = a.name_Last.toUpperCase().trim() // ignore upper and lowercase
    const nameB = b.name_Last.toUpperCase().trim() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    // names must be equal
    return 0
  })
  console.log("Sorted by last name.")
  return i
}

export async function sortFName_Service(i: Array<{}>) {
  i.sort((
    a: any,
    b: any
  ) => {
    const nameA = a.name_First.toUpperCase().trim() // ignore upper and lowercase
    const nameB = b.name_First.toUpperCase().trim() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    // names must be equal
    return 0
  })
  console.log("Sorted by first name.")
  return i
}

// By Created Date
export async function sortCreatedDate_Earliest_Service(i: Array<{}>) {
  i.sort((
    a: any,
    b: any
  ) => {
    const dateA = a.createdAt // ignore upper and lowercase
    const dateB = b.createdAt // ignore upper and lowercase
    if (dateA < dateB) {
      return -1
    }
    if (dateA > dateB) {
      return 1
    }
    // dates must be equal
    return 0
  })
}

export async function sortCreatedDate_Latest_Service(i: Array<{}>) {
  i.sort((
    a: any,
    b: any
  ) => {
    const dateA = a.createdAt // ignore upper and lowercase
    const dateB = b.createdAt // ignore upper and lowercase
    if (dateA > dateB) {
      return -1
    }
    if (dateA < dateB) {
      return 1
    }
    // dates must be equal
    return 0
  })
}

