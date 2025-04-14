/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Sort Attendees/Leads |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

// By first name
async function sortFName_Service(i: Array<{}>) {

  i.sort((
    a: any,
    b: any
  ) => {
    const nameA = a.name_First.toUpperCase() // ignore upper and lowercase
    const nameB = b.name_First.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    // names must be equal
    return 0
  })
}

// By first name
async function sortLName_Service(i: Array<{}>) {

  i.sort((
    a: any,
    b: any
  ) => {
    const nameA = a.name_Last.toUpperCase() // ignore upper and lowercase
    const nameB = b.name_Last.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    // names must be equal
    return 0
  })
}

// By Created Date
async function sortCreatedDate_Service(i: Array<{}>) {
  i.sort((
    a: any,
    b: any
  ) => {
    const nameA = a.name_Last.toUpperCase() // ignore upper and lowercase
    const nameB = b.name_Last.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    // names must be equal
    return 0
  })
}

export { sortFName_Service, sortLName_Service, sortCreatedDate_Service }
