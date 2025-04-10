/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/
/*-| Search Attendees/Leads |-*/
/*/===!===!===!===!===!===!===!===!===!===!===!===!===!===!===!/*/

// By first name
async function searchAttendeeName_Service(i: Array<{}>, s: String, r: any) {
  // console.log(s)
  let searchTerms = s.split(' ')
  let searchHold: object[] = []
  console.log(searchTerms)
  for (let x = 0; x < searchTerms.length; x++) {
    console.log(searchTerms)
    searchHold.push(i.filter((a: any) => {
      a.name_First.trim().toUpperCase().includes(searchTerms[x].trim().toUpperCase()) || a.name_Last.trim().toUpperCase().includes(searchTerms[x].trim().toUpperCase())
    }))
  }
  r.value = searchHold
  /*r.value = i.filter((a: any) => {
    return a.name_First.trim().toUpperCase().includes(s.trim().toUpperCase()) || a.name_Last.trim().toUpperCase().includes(s.trim().toUpperCase())
  })*/
  console.log('Search Service ', r)
}

export { searchAttendeeName_Service }
