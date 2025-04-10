/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Search Attendees/Leads |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

// By first name
async function searchAttendeeName_Service(i: Array<{}>, s: String, r: any) {
  // console.log(s)
  r.value = i.filter((a: any) => {
    return a.name_First.trim().toUpperCase().includes(s.trim().toUpperCase()) || a.name_Last.trim().toUpperCase().includes(s.trim().toUpperCase())
  })
  console.log('Search Service ', r)
}

export { searchAttendeeName_Service }
